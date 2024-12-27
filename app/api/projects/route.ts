import { PartialProject } from '@/types/project.types';
import convertToWebP from '@/utils/common/convertToWebP';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('isView', true)
    .order('number', { ascending: true });

  if (error) {
    revalidatePath('/', 'layout');
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: Request) {
  let uploadResults: (string | null)[] = [];
  const supabase = await createClient();

  const formData = await req.formData();

  const newProjectJson = formData.get('project');
  const newProject = JSON.parse(newProjectJson as string) as PartialProject;
  const images = formData.getAll('images') as File[] | string;

  if (typeof images === 'object' && images.length > 0) {
    const imageBufferPromises = images.map(async (image) => convertToWebP(image, 720));

    const imageBuffers = await Promise.all(imageBufferPromises);

    if (imageBuffers.length === 0) {
      return NextResponse.json({ error: '이미지 변환 실패' }, { status: 500 });
    }

    const uploadPromises = imageBuffers.map(async (imageBuffer, index) => {
      const filePath = `projects/${Date.now()}_${index}.webp`; // 파일 이름에 인덱스를 추가하여 고유하게 만듭니다.
      if (!imageBuffer) return null;
      const { data: imageData, error: imageError } = await supabase.storage
        .from('projects')
        .upload(filePath, imageBuffer, {
          contentType: 'image/webp',
        });

      if (imageError) {
        throw new Error(`이미지 업로드 실패: ${imageError.message}`);
      }

      const { data: publicUrl } = supabase.storage.from('projects').getPublicUrl(filePath);

      return publicUrl.publicUrl;
    });

    try {
      uploadResults = await Promise.all(uploadPromises);
    } catch (error: unknown) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : '알 수 없는 오류' },
        { status: 500 },
      );
    }
  }

  const { data, error } = await supabase
    .from('projects')
    .upsert({
      ...newProject,
      images: uploadResults.length === 0 ? newProject.images : uploadResults,
    })
    .select()
    .single();

  if (error) {
    revalidatePath('/', 'layout');
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

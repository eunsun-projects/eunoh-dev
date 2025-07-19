import type { PartialProject } from "@/types/project.types";
import convertToWebP from "@/utils/common/convertToWebP";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("isView", true)
      .order("number", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        // ISR과 잘 맞는 캐시 헤더
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  let uploadResults: (string | null)[] = [];
  const supabase = await createClient();

  const formData = await req.formData();

  const newProjectJson = formData.get("project");
  const newProject = JSON.parse(newProjectJson as string) as PartialProject;
  const images = formData.getAll("images") as File[] | string;

  if (typeof images === "object" && images.length > 0) {
    const imageBufferPromises = images.map(async (image) =>
      convertToWebP(image, 720)
    );

    const imageBuffers = await Promise.all(imageBufferPromises);

    if (imageBuffers.length === 0) {
      return NextResponse.json({ error: "이미지 변환 실패" }, { status: 500 });
    }

    const uploadPromises = imageBuffers.map(async (imageBuffer, index) => {
      const filePath = `projects/${Date.now()}_${index}.webp`; // 파일 이름에 인덱스를 추가하여 고유하게 만듭니다.
      if (!imageBuffer) return null;
      const { data: imageData, error: imageError } = await supabase.storage
        .from("projects")
        .upload(filePath, imageBuffer, {
          contentType: "image/webp",
        });

      if (imageError) {
        throw new Error(`이미지 업로드 실패: ${imageError.message}`);
      }

      const { data: publicUrl } = supabase.storage
        .from("projects")
        .getPublicUrl(filePath);

      return publicUrl.publicUrl;
    });

    try {
      uploadResults = await Promise.all(uploadPromises);
    } catch (error: unknown) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "알 수 없는 오류" },
        { status: 500 }
      );
    }
  }

  let uploadImages: string[] = [];

  if (uploadResults.length === 0) uploadImages = newProject.images ?? [];
  else {
    uploadImages = uploadResults.filter((image) => image !== null) as string[];
  }

  const { data, error } = await supabase
    .from("projects")
    .upsert({
      ...newProject,
      images: uploadImages,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 🔥 전략적 revalidation
  // 1. 메인 프로젝트 목록 페이지
  revalidatePath("/", "layout");

  // 2. 새로 생성/수정된 프로젝트 상세 페이지
  revalidatePath(`/projects/${data.id}`, "page");

  // 3. 전체 프로젝트 목록 (필요시)
  revalidatePath("/projects", "page");
  return NextResponse.json(data, { status: 201 });
}

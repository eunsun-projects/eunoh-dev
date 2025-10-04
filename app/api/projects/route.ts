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

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const formData = await req.formData();

    const projectField = formData.get("project");
    if (!projectField || typeof projectField !== "string") {
      return NextResponse.json(
        { error: "project 필드가 없습니다." },
        { status: 400 },
      );
    }

    let newProject: PartialProject;
    try {
      newProject = JSON.parse(projectField) as PartialProject;
    } catch {
      return NextResponse.json(
        { error: "project JSON 파싱 실패" },
        { status: 400 },
      );
    }

    const rawImages = formData.getAll("images");
    const files = rawImages.filter(
      (f): f is File => typeof f !== "string" && f instanceof Blob,
    );

    let uploadResults: (string | null)[] = [];

    if (files.length > 0) {
      const imageBufferPromises = files.map(async (image) =>
        convertToWebP(image, 720),
      );
      const imageBuffers = await Promise.all(imageBufferPromises);

      if (imageBuffers.every((b) => !b)) {
        return NextResponse.json(
          { error: "이미지 변환 실패" },
          { status: 500 },
        );
      }

      const uploadPromises = imageBuffers.map(async (imageBuffer, index) => {
        if (!imageBuffer) return null;
        const filePath = `projects/${Date.now()}_${index}.webp`;
        const { error: imageError } = await supabase.storage
          .from("projects")
          .upload(filePath, imageBuffer, { contentType: "image/webp" });
        if (imageError) {
          throw new Error(`이미지 업로드 실패: ${imageError.message}`);
        }
        const { data: publicUrl } = supabase.storage
          .from("projects")
          .getPublicUrl(filePath);
        return publicUrl.publicUrl;
      });

      uploadResults = await Promise.all(uploadPromises);
    }

    const uploadImages: string[] =
      uploadResults.length === 0
        ? (newProject.images ?? [])
        : (uploadResults.filter((image) => image !== null) as string[]);

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

    revalidatePath("/", "layout");
    revalidatePath(`/projects/${data.id}`, "page");
    revalidatePath("/projects", "page");
    return NextResponse.json(data, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "서버 오류";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

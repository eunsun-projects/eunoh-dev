import { PartialProject } from "@/types/project.types";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const newProject: PartialProject = await req.json();
    const supabase = createClient();

    const { data, error } = await supabase
        .from("projects")
        .upsert({ ...newProject })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
}

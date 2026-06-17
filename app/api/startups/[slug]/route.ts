import { NextResponse } from "next/server";
import { getStartupBySlug } from "@/lib/yc-api";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const startup = await getStartupBySlug(params.slug);
    if (!startup) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }
    return NextResponse.json({ startup });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch company" },
      { status: 502 }
    );
  }
}

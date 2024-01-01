import { NextRequest, NextResponse } from "next/server";
import { customAxiosPost } from "@/helpers/custom-axios";
import { API_BACKEND } from "@/helpers/api-url";
import { GROUP } from "@/types/group";

export async function GET(request: NextRequest) {
  let searchParams = request.nextUrl.search;
  const url = API_BACKEND.GROUP.GET_GROUPS + searchParams;

  try {
    const res: { count: number; error: boolean; groups: GROUP[] } =
      await customAxiosPost(url);
    if (res.error === false) {
      const response = NextResponse.json({
        success: true,
        groups: res.groups,
      });
      return response;
    } else return "Error";
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

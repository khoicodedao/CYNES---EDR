import { NextRequest, NextResponse } from "next/server";
import { customAxiosPost } from "@/helpers/custom-axios";
import { API_BACKEND } from "@/helpers/api-url";
import { COMMAND } from "@/types/command";

export async function GET(request: NextRequest) {
  let searchParams = request.nextUrl.search;
  const url = API_BACKEND.COMMAND.GET_COMMAND + searchParams;
  try {
    const res: { count: number; error: boolean; commands: COMMAND[] } =
      await customAxiosPost(url);
    if (res.error === false) {
      const response = NextResponse.json({
        success: true,
        commands: res.commands,
      });
      return response;
    } else return "Error";
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

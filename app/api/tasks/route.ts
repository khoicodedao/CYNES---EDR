import { NextRequest, NextResponse } from "next/server";
import { customAxiosGet } from "@/helpers/custom-axios";
import { API_BACKEND } from "@/helpers/api-url";
import { TASK } from "@/types/task";

export async function GET(request: NextRequest) {
  let searchParams = request.nextUrl.search;
  const url = API_BACKEND.TASK.GET_TASKS + searchParams;

  try {
    const res: { count: number; error: boolean; tasks: TASK[] } =
      await customAxiosGet(url);
    if (res.error === false) {
      const response = NextResponse.json({
        success: true,
        tasks: res.tasks,
      });
      return response;
    } else return "Error";
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

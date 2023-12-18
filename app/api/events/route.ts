import { NextRequest, NextResponse } from "next/server";
import { customAxiosGet } from "@/helpers/custom-axios";
import { API_BACKEND } from "@/helpers/api-url";
import { EVENT } from "@/types/event";

export async function GET(request: NextRequest) {
  let searchParams = request.nextUrl.search;
  const url = API_BACKEND.EVENTS.GET_EVENTS + searchParams;

  try {
    const res: { count: number; error: boolean; events: EVENT[] } =
      await customAxiosGet(url);
    if (res.error === false) {
      const response = NextResponse.json({
        success: true,
        events: res.events,
      });
      return response;
    } else return "Error";
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { customAxiosPost } from "@/helpers/custom-axios";
import { API_BACKEND } from "@/helpers/api-url";
import { EVENT } from "@/types/event";

export async function POST(request: NextRequest) {
  let searchParams = await request.json();
  const url = API_BACKEND.EVENTS.GET_EVENTS;
  try {
    const res: { count: number; error: boolean; events: EVENT[] } =
      await customAxiosPost(url, searchParams);
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

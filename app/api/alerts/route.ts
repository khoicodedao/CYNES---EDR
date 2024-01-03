import { NextRequest, NextResponse } from "next/server";
import { customAxiosPost } from "@/helpers/custom-axios";
import { API_BACKEND } from "@/helpers/api-url";
import { ALERT } from "@/types/alert";
export async function POST(request: NextRequest) {
  const url = API_BACKEND.ALERTS.GET_ALERTS;
  let searchParams = await request.json();

  try {
    const res: { count: number; error: boolean; alerts: ALERT[] } =
      await customAxiosPost(url, searchParams);
    console.log(res);
    if (res.error === false) {
      const response = NextResponse.json({
        success: true,
        alerts: res.alerts,
      });
      return response;
    } else return "Error";
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

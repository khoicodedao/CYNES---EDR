import { NextRequest, NextResponse } from "next/server";
import { customAxiosPost } from "@/helpers/custom-axios";
import { API_BACKEND } from "@/helpers/api-url";

export async function POST(request: NextRequest) {
  let token = request.cookies.get("token")?.value || "";
  let dataParams = await request.json();
  console.log(dataParams);
  const url = API_BACKEND.DATABASE.ADD_DATABASE;
  try {
    const res: { error: boolean; msg: string } = await customAxiosPost(
      url,
      [dataParams],
      token
    );
    if (res.error === false) {
      const response = NextResponse.json({
        error: res.error,
        msg: res.msg,
      });
      return response;
    } else return "Error";
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

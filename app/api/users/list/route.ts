import { NextRequest, NextResponse } from "next/server";
import { customAxiosPost } from "@/helpers/custom-axios";
import { API_BACKEND } from "@/helpers/api-url";
import { USER } from "@/types/user";
export async function POST(request: NextRequest) {
  const url = API_BACKEND.USER.GET_USERS;
  let token = request.cookies.get("token")?.value || "";
  try {
    const users: { users: USER[] } = await customAxiosPost(url, {}, token);
    const response = NextResponse.json({
      success: true,
      users,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

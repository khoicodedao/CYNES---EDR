import { NextRequest, NextResponse } from "next/server";
import { customAxiosGet } from "@/helpers/custom-axios";
import { API_BACKEND } from "@/helpers/api-url";
import { USER } from "@/types/user";
export async function GET() {
  const url = API_BACKEND.USER.GET_USERS;
  try {
    const users: { users: USER[] } = await customAxiosGet(url);
    const response = NextResponse.json({
      success: true,
      users,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { customAxiosGet } from "@/helpers/custom-axios";
import { API_BACKEND } from "@/helpers/api-url";
import { AGENT } from "@/types/agent";
export async function GET() {
  const url = API_BACKEND.AGENT.GET_AGENTS;
  try {
    const agents: { agents: AGENT[] } = await customAxiosGet(url);
    const response = NextResponse.json({
      success: true,
      data: agents,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

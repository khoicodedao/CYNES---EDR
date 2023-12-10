
import { NextRequest, NextResponse } from "next/server";
import { customAxiosGet } from "@/helpers/custom-axios";
import { API_BACKEND } from "@/helpers/api-url";
import {ALERT} from "@/types/alert"
export async function GET() {
  const url = API_BACKEND.ALERTS.GET_ALERTS;
  try {
    const res:{count:number,error:boolean,alerts:ALERT[]} = await customAxiosGet(url);
    if(res.error===false){

      const response = NextResponse.json({
        success: true,
        alerts: res.alerts,
      });
      return response;
    }
    else return "Error"
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

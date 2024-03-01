import { NextRequest, NextResponse } from "next/server";
import { customAxiosPost } from "@/helpers/custom-axios";
import { API_BACKEND } from "@/helpers/api-url";
function getDatesOfWeek() {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - currentDay);
  const datesOfWeek = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const formattedDate = formatDate(date);
    datesOfWeek.push(formattedDate);
  }

  return datesOfWeek;
}
function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function queryByDay(startDate: string, url: string, alertLevel: string) {
  //filter record by day with level
  const filter = {
    filter: [
      {
        field: "created_at",
        operator: ">",
        value: startDate,
      },
      {
        field: "alert_level",
        operator: "=", // operation in sql . ex: event_info->>'name' like '%auto%'
        value: alertLevel, //1-low, 2- medium, 3 - hight, 4-critical
      },
    ],
  };

  try {
    const res: { count: number; error: boolean; msg: string | null } =
      await customAxiosPost(url, filter);

    return res;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function POST() {
  const url = API_BACKEND.DASHBOARD.GET_ALERT_COUNT;
  try {
    let data = await queryByDay("2023-12-03", url, "1"); // test data
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

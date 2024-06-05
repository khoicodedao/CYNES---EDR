"use client";
import FunctionBar from "@/components/common/FunctionBar";
import useLocalStorage from "@/hooks/useLocalStorage";
import dayjs from "dayjs";
import React, { Suspense, useState, useEffect } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import Card from "./Card";
import FallbackChartTwo from "./FallbackChartTwo";
import API_URL from "@/helpers/api-url";
import { customAxiosPost } from "@/helpers/custom-axios";

const DashBoard: React.FC = () => {
  const [dataChartTwo, setDataChartTwo] = useState<any[]>([
    {
      name: "Low",
      data: [0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "Medium",
      data: [0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "Hight",
      data: [0, 0, 0, 0, 0, 0, 0],
    },
  ]);
  const [storedValue, setStoredValue] = useLocalStorage("local-time", [
    dayjs().toISOString(),
    dayjs().endOf("day").toISOString(),
  ]);
  const defaultTimeRange =
    storedValue.length > 0
      ? [storedValue[0], storedValue[1]]
      : [dayjs().toISOString(), dayjs().endOf("day").toISOString()];
  const [timeRange, setTimeRange] = useState<string[]>(defaultTimeRange);
  const [search, setSearch] = useState<
    { field: string; operator: string; value: string }[]
  >([]);
  const eventInWeek = async () => {
    // Get the start and end dates of the current week
    const currentDate = new Date();
    const startOfWeek = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay())
    );
    let urlEvent = API_URL.ALERTS.COUNT_ALERTS;
    let dataStatistic: any = [
      {
        name: "Low",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Medium",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Hight",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ];
    const fetchDataForDay = async (day: any) => {
      const dayStart = new Date(
        startOfWeek.getTime() + day * 24 * 60 * 60 * 1000
      );
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000 - 1);

      const filter = [
        {
          field: "created_at",
          operator: ">=",
          value: dayStart.toISOString().slice(0, 10),
        },
        {
          field: "created_at",
          operator: "<=",
          value: dayEnd.toISOString().slice(0, 10),
        },
      ];
      let resData: { success: boolean; data: any } = await customAxiosPost(
        urlEvent,
        { filter }
      );
      if (resData.success) {
        return resData.data;
      } else {
        return { hight: 0, medium: 0, low: 0 };
      }
    };

    const getDataEvent: any = async () => {
      for (let day = 0; day < 7; day++) {
        let data = await fetchDataForDay(day);
        dataStatistic[0].data[day] = data.low;
        dataStatistic[1].data[day] = data.medium;
        dataStatistic[2].data[day] = data.hight;
      }
    };
    await getDataEvent();
    setDataChartTwo(dataStatistic);
  };
  useEffect(() => {
    eventInWeek();
  }, []);

  return (
    <div className="dashboard">
      <FunctionBar
        setStoredValue={setStoredValue}
        storedValue={storedValue}
        setTimeRange={setTimeRange}
        setSearch={setSearch}
        search={search}
        placeHolder="Search by query (mac='AA-DC-2F-4A-AD-F5')"
      ></FunctionBar>
      <Card timeRange={timeRange}></Card>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />

        <ChartTwo data={dataChartTwo} />

        {/* {/* <ChartThree title="Alerts" data={Object.values(alertLevel)} /> */}
      </div>
    </div>
  );
};

export default DashBoard;

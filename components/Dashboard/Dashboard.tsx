"use client";
import FunctionBar from "@/components/common/FunctionBar";
import API_URL from "@/helpers/api-url";
import { customAxiosPost } from "@/helpers/custom-axios";
import useLocalStorage from "@/hooks/useLocalStorage";
import dayjs from "dayjs";
import React, { Suspense, useEffect, useState } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import Card from "./Card";
import FallbackChartTwo from "./FallbackChartTwo";
type Level = {
  hight: number;
  medium: number;
  low: number;
};
const DashBoard: React.FC = () => {
  const [alertLevel, setAlertLevel] = useState<Level>({
    hight: 0,
    medium: 0,
    low: 0,
  });
  const [eventLevel, setEventLevel] = useState<Level>({
    hight: 0,
    medium: 0,
    low: 0,
  });
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
  let filter: any = {};

  useEffect(() => {
    if (timeRange) {
      const filterInTimeRage = [
        {
          field: "created_at",
          operator: ">=",
          value: timeRange[0],
        },
        {
          field: "created_at",
          operator: "<=",
          value: timeRange[1],
        },
      ];
      filter["filter"] = filterInTimeRage;
    }
    let urlEvent = API_URL.EVENTS.COUNT_EVENTS;
    let getDataEvent = async () => {
      let resData: { success: boolean; data: Level } = await customAxiosPost(
        urlEvent,
        filter
      );
      console.log(resData);
      if (resData.success) {
        setEventLevel(resData.data);
      }
    };
    //======Get Alert data
    let urlAlert = API_URL.ALERTS.COUNT_ALERTS;
    let getDataAlert = async () => {
      let resData: { success: boolean; data: Level } = await customAxiosPost(
        urlAlert,
        filter
      );
      console.log(resData);
      if (resData.success) {
        setAlertLevel(resData.data);
      }
    };
    //==========fetch data
    getDataAlert();
    getDataEvent();
  }, [timeRange]);
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
        <Suspense fallback={<FallbackChartTwo />}>
          <ChartTwo timeRange={timeRange} />
        </Suspense>
        {/* {/* <ChartThree title="Alerts" data={Object.values(alertLevel)} /> */}
      </div>
    </div>
  );
};

export default DashBoard;

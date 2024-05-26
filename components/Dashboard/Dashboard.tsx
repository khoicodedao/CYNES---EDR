"use client";
import FunctionBar from "@/components/common/FunctionBar";
import useLocalStorage from "@/hooks/useLocalStorage";
import dayjs from "dayjs";
import React, { Suspense, useState } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import Card from "./Card";
import FallbackChartTwo from "./FallbackChartTwo";
const DashBoard: React.FC = () => {
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

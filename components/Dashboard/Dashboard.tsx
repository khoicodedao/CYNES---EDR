"use client";
import React, { useState } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import Card from "./Card";
import { Suspense } from "react";
import FallbackChartTwo from "./FallbackChartTwo";
import useLocalStorage from "@/hooks/useLocalStorage";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import FunctionBar from "@/components/common/FunctionBar";
const MapOne = dynamic(() => import("../Maps/MapOne"), {
  ssr: false,
});

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
    <>
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
        {/* Line chart for Alert and */}
        <ChartOne />
        {/* End chart */}
        {/* Column chart by time */}
        <Suspense fallback={<FallbackChartTwo />}>
          <ChartTwo timeRange={timeRange} />
        </Suspense>
        {/* End chart */}
        {/* Pie chart */}
        <ChartThree />
        {/* Pie chart */}

        <MapOne />
      </div>
    </>
  );
};

export default DashBoard;

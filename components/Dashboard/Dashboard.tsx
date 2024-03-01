"use client";
import React, { useEffect, useState } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import Card from "./Card";
import FunctionBar from "./FunctionBar";
import { Suspense } from "react";
import FallbackChartTwo from "./FallbackChartTwo";
// import Map from "../Maps/TestMap";
import dynamic from "next/dynamic";
const MapOne = dynamic(() => import("../Maps/MapOne"), {
  ssr: false,
});

const DashBoard: React.FC = () => {
  return (
    <>
      <FunctionBar />
      <Card></Card>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* Line chart for Alert and */}
        <ChartOne />
        {/* End chart */}
        {/* Column chart by time */}
        <Suspense fallback={<FallbackChartTwo />}>
          <ChartTwo />
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

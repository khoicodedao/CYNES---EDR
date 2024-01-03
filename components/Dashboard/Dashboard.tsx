"use client";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import CardDataStats from "../CardDataStats";
import FunctionBar from "./FunctionBar";
import { WarningOutlined } from "@ant-design/icons";

// import Map from "../Maps/TestMap";
import dynamic from "next/dynamic";
const MapOne = dynamic(() => import("../Maps/MapOne"), {
  ssr: false,
});

const DashBoard: React.FC = () => {
  return (
    <>
      <FunctionBar />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5 mt-7.5">
        <CardDataStats
          title="Agents"
          total="1.531"
          newData="+ 1"
          detail={[
            { title: "Online", count: "220", ratio: 20 },
            { title: "Offline", count: "10", ratio: 80 },
          ]}
          levelUp
        >
          <svg
            className="fill-primary dark:fill-white"
            width="150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            id="Layer_1"
            viewBox="0 0 32 32"
          >
            <title />
            <path d="M30,3H2A2,2,0,0,0,0,5V24a2,2,0,0,0,2,2H14v2H10v1H22V28H18V26H30a2,2,0,0,0,2-2V5A2,2,0,0,0,30,3ZM17,28H15V26h2v2Zm14-4a1,1,0,0,1-1,1H2a1,1,0,0,1-1-1V5A1,1,0,0,1,2,4H30a1,1,0,0,1,1,1V24Z" />
            <path d="M2,21H30V5H2V21ZM3,6H29V20H3V6Z" />
            <circle cx="16" cy="23" r="1" />
          </svg>
        </CardDataStats>

        <CardDataStats
          title="Alerts"
          total="3.456"
          newData="2.010"
          detail={[
            { title: "Hight", count: "200", ratio: 49 },
            { title: "Low", count: "100", ratio: 51 },
          ]}
          levelDown
        >
          <WarningOutlined></WarningOutlined>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* Line chart for Alert and */}
        <ChartOne />
        {/* End chart */}
        {/* Column chart by time */}
        <ChartTwo />
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

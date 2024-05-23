"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    type: "donut",
  },
  colors: ["#2693F5", "#B1EDFF", "#0B5970", "#0B5970"],
  labels: ["Hight", "Medium", "Low"],
  legend: {
    show: false,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "30%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
};
type ChartThreeProps = {
  title: string;
  data: number[];
};
const ChartThree: React.FC<ChartThreeProps> = ({ title, data }) => {
  return <ReactApexChart options={options} series={data} type="donut" />;
};

export default ChartThree;

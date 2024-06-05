"use client";
import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";

type DataGridProps = {
  data?: any;
};
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
const options: ApexOptions = {
  colors: ["#DAF7FF", "#19CAFF", "#2693F5"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "bar",
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: "25%",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: ["M", "T", "W", "T", "F", "S", "S"],
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",

    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};
const ChartTwo: React.FC<DataGridProps> = ({ data }) => {
  let series = data;
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Statistic Alert
          </h4>
        </div>
      </div>

      <div id="chartTwo" className="-ml-5 -mb-9">
        <ApexCharts
          options={options}
          series={
            series as {
              name: string;
              data: number[];
            }[]
          }
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default ChartTwo;

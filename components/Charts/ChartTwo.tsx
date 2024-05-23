// "use client";
import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";
type DataGridProps = {
  timeRange?: string[];
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
const ChartTwo: React.FC<DataGridProps> = async ({ timeRange }) => {
  function fetchDataWithDelay() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sampleData = [
          {
            name: "Low",
            data: [44, 55, 41, 67, 22, 43, 65],
          },
          {
            name: "Medium",
            data: [13, 23, 20, 8, 13, 27, 15],
          },
          {
            name: "Hight",
            data: [13, 23, 20, 8, 13, 27, 15],
          },
        ];
        resolve(sampleData);
      }, 1000); // Delay response by 3 seconds
    });
  }
  let series = await fetchDataWithDelay();
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Statistic
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

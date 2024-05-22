"use client";
import API_URL from "@/helpers/api-url";
import calculatePercentages from "@/helpers/caculatePercentages";
import { customAxiosPost } from "@/helpers/custom-axios";
import { Progress } from "antd";
import React, { useEffect, useState } from "react";
import "./index.css";
type DataGridProps = {
  timeRange: string[];
};
type EventLevel = {
  hight: number;
  medium: number;
  low: number;
};
const StatisticEvent: React.FC<DataGridProps> = ({ timeRange }) => {
  const [data, setData] = useState<EventLevel>({ hight: 0, medium: 0, low: 0 });
  let [dataPercentage, setDataPercentage] = useState<any>({
    hight: 0,
    medium: 0,
    low: 0,
  });
  let filter: any = {};
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
  useEffect(() => {
    let url = API_URL.EVENTS.COUNT_EVENTS;
    let getData = async () => {
      let resData: { success: boolean; data: EventLevel } =
        await customAxiosPost(url, filter);
      console.log(resData);
      if (resData.success) {
        setData(resData.data);
        setDataPercentage(calculatePercentages(resData.data));
      }
    };

    getData();
  }, [timeRange]);

  return (
    <div className="severity">
      <div className="flex justify-around items-center">
        <div className="w-1/3">
          <div className="flex items-center  justify-around flex-row">
            {/* <div className="w-1/2"></div> */}
            <div className="w-full">
              <div className="parent m-auto">
                <b
                  style={{ color: "#dceefd", width: "100%", fontSize: "24px" }}
                >
                  {Object.values(data)
                    .reduce((acc, val) => acc + val, 0)
                    .toLocaleString("en-US")}
                </b>
                <div className="total-events">Total events</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <div className="flex items-center  justify-around flex-row">
            <p
              className="font-bold"
              style={{
                color: "#2693f5",
                width: "fit-content",
                marginRight: "10px",
                fontSize: "24px",
              }}
            >
              {data.hight.toLocaleString("en-US")}
            </p>
            <div style={{ width: "90%" }}>
              <p className="font-bold">High</p>
              <Progress
                strokeColor="#2693f5"
                status="active"
                percent={dataPercentage.hight && "0"}
              />
            </div>
          </div>
          <div className="flex items-center  justify-around flex-row">
            <p
              className="font-bold"
              style={{
                color: "#7ee1ff",
                width: "fit-content",
                marginRight: "10px",
                fontSize: "24px",
              }}
            >
              {data.medium.toLocaleString("en-US")}
            </p>
            <div style={{ width: "90%" }}>
              <p className="font-bold">Medium</p>
              <Progress
                percent={dataPercentage.medium && "0"}
                strokeColor="#7ee1ff"
                status="active"
              />
            </div>
          </div>
          <div className="flex items-center  justify-around flex-row">
            <p
              className="font-bold"
              style={{
                color: "#dceefd",
                width: "fit-content",
                marginRight: "10px",
                fontSize: "24px",
              }}
            >
              {data.low.toLocaleString("en-US")}
            </p>
            <div style={{ width: "90%" }}>
              <p className="font-bold">Low</p>
              <Progress
                percent={dataPercentage.low && "0"}
                strokeColor="#dceefd"
                status="active"
              />
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <img
            className="art-icon float-right"
            alt=""
            src="/images/art.svg"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default StatisticEvent;

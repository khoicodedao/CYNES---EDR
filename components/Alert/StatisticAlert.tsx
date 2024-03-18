"use client";
import React, { useEffect, useState } from "react";
import "./index.css";
import { Col, Row, Statistic, Badge } from "antd";
import { customAxiosPost } from "@/helpers/custom-axios";
import API_URL from "@/helpers/api-url";
type DataGridProps = {
  timeRange: string[];
};
type AlertLevel = {
  hight: number;
  medium: number;
  low: number;
};
const StatisticEvent: React.FC<DataGridProps> = ({ timeRange }) => {
  const [data, setData] = useState<AlertLevel>({ hight: 0, medium: 0, low: 0 });
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
    let url = API_URL.ALERTS.COUNT_ALERTS;
    let getData = async () => {
      let resData: { success: boolean; data: AlertLevel } =
        await customAxiosPost(url, filter);
      console.log(resData);
      if (resData.success) {
        setData(resData.data);
      }
    };

    getData();
  }, [timeRange]);
  return (
    <div className="">
      <Row gutter={15}>
        <Col
          className="flex justify-center items-center border-r border-solid border-gray"
          span={4}
        >
          <h4 className="text-xl capitalize">Severity</h4>
        </Col>
        <Col className="border-r border-solid border-gray" span={5}>
          <Statistic
            title={
              <div className="flex">
                <Badge status="error" />
                <p className="ml-2 opacity-70 font-bold"> Hight</p>
              </div>
            }
            value={data.hight}
          />
        </Col>

        <Col className="border-r border-solid border-gray" span={5}>
          <Statistic
            title={
              <div className="flex">
                <Badge status="warning" />
                <p className="ml-2 opacity-70 font-bold"> Medium</p>
              </div>
            }
            value={data.medium}
          />
        </Col>
        <Col className="border-r border-solid border-gray " span={5}>
          <Statistic
            title={
              <div className="flex">
                <Badge status="processing" />
                <p className="ml-2 opacity-70 font-bold"> Low</p>
              </div>
            }
            value={data.low}
          />
        </Col>
      </Row>
    </div>
  );
};

export default StatisticEvent;

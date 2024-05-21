import React, { ReactNode } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic, Progress } from "antd";
interface CardDataStatsProps {
  title: string;
  total: string;
  // newData: string;
  // levelUp?: boolean;
  // levelDown?: boolean;
  detail?: Array<{ title: string; count: string; ratio: number }>;
  children: ReactNode;
}
const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  // newData,
  // levelUp,
  // levelDown,
  detail = [
    { title: "Loading...", count: "0", ratio: 0 },
    { title: "Loading...", count: "0", ratio: 0 },
  ],
  children,
}) => {
  return (
    <div className="  grid grid-cols-2 ">
      {/* 1st grid - Main alert */}
      <div className="border-none flex items-center justify-between rounded-sm border border-stroke bg-[#ffff0091] py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark p-4">
        <div className="flex h-11.5 w-20 items-center justify-center rounded-full">
          {children}
        </div>
        <div className="mt-4 flex items-end 2xl:w-1/2 space-around">
          <div>
            <h4 className="text-title-md font-bold text-2xl xl:text-4xl 2xl:text-6xl text-black dark:text-white">
              {total}
            </h4>
            <span className="text-sm font-medium xl:text-xl 2xl:text-3xl">
              {title}
            </span>
          </div>
        </div>
      </div>
      {/* end */}
      {/*  2nd grid - detail for main grid */}
      <div className="ml-2">
        <Col>
          <Col span={24}>
            <Card className=" dark:bg-boxdark" bordered={false}>
              <div className=" flex items-center  justify-between">
                <div
                  className="flex item-center flex-col justify-center"
                  style={{ paddingLeft: "10%" }}
                >
                  <h4 className="text-title-md font-bold text-black dark:text-white">
                    {detail[0].count}
                  </h4>
                  <p className="text-custom-green">{detail[0].title}</p>
                  {/* <Statistic
                    title={detail[0].title}
                    // value={20}
                    precision={0}
                    valueStyle={{ color: "#3f8600" }}
                    // prefix={<ArrowUpOutlined />}
                    suffix=""
                  /> */}
                </div>
                <Progress
                  style={{ paddingRight: "10%" }}
                  width={50}
                  type="circle"
                  strokeColor="#3f8600"
                  percent={detail[0].ratio}
                />
              </div>
            </Card>
          </Col>
          <Col span={24}>
            <Card className="dark:bg-boxdark mt-2" bordered={false}>
              <div className=" flex items-center justify-between">
                <div
                  className="flex item-center flex-col justify-center"
                  style={{ paddingLeft: "10%" }}
                >
                  <h4 className="text-title-md font-bold text-black dark:text-white">
                    {detail[1].count}
                  </h4>
                  <p className="text-custom-red">{detail[1].title}</p>

                  {/* <Statistic
                    title="offline"
                    value={80}
                    precision={0}
                    valueStyle={{ color: "#cf1322" }}
                    prefix={<ArrowDownOutlined />}
                    suffix=""
                  /> */}
                </div>

                <Progress
                  style={{ paddingRight: "10%" }}
                  width={50}
                  type="circle"
                  strokeColor="#cf1322"
                  percent={detail[1].ratio}
                />
              </div>
            </Card>
          </Col>
        </Col>
      </div>
      {/* end */}
    </div>
  );
};

export default CardDataStats;

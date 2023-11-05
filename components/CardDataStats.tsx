import React, { ReactNode } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic, Progress } from "antd";
interface CardDataStatsProps {
  title: string;
  total: string;
  newData: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  newData,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div className="grid grid-cols-2 ">
      <div className=" flex items-center justify-between rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark p-4">
        <div className="flex h-11.5 w-20 items-center justify-center rounded-full">
          {children}
        </div>
        <div className="mt-4 flex items-end 2xl:w-1/2 justify-between">
          <div>
            <h4 className="text-title-md font-bold text-2xl xl:text-4xl 2xl:text-6xl text-black dark:text-white">
              {total}
            </h4>
            <span className="text-sm font-medium">{title}</span>
            <span
              className={`flex items-center gap-1 text-sm font-medium ${
                levelUp && "text-meta-3"
              } ${levelDown && "text-meta-5"} `}
            >
              {newData} <p className="lowercase">{title}</p>
              {levelUp && (
                <svg
                  className="fill-meta-3"
                  width="10"
                  height="11"
                  viewBox="0 0 10 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                    fill=""
                  />
                </svg>
              )}
              {levelDown && (
                <svg
                  className="fill-meta-5"
                  width="10"
                  height="11"
                  viewBox="0 0 10 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                    fill=""
                  />
                </svg>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="ml-2">
        <Col>
          <Col span={24}>
            <Card className="dark:bg-boxdark" bordered={false}>
              <div className=" flex items-center justify-between">
                <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {536}
                </h4>
                <span className="text-sm font-medium dark:text-white opacity-50">Online</span>
                </div>
              
                <Statistic
                  title=""
                  value={20}
                  precision={0}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  suffix=""
                />{" "}
               
                <Progress type="circle" strokeColor="#3f8600" percent={75} />
              </div>
            </Card>
          </Col>
          <Col span={24}>
            <Card className="dark:bg-boxdark mt-2" bordered={false}>
              <div className=" flex items-center justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {145}
                </h4>
                <span className="text-sm font-medium dark:text-white opacity-50">Offline</span>
                </div>
                <Statistic
                  title=""
                  value={80}
                  precision={0}
                  valueStyle={{ color: "#cf1322" }}
                  prefix={<ArrowDownOutlined />}
                  suffix=""
                />

                
                <Progress type="circle" strokeColor="#cf1322" percent={25} />
              </div>
            </Card>
          </Col>
        </Col>
      </div>
    </div>
  );
};

export default CardDataStats;

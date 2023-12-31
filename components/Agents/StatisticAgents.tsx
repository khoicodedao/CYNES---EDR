import React from "react";
import "./index.css";
import { Col, Row, Statistic, Badge } from "antd";

const StatisticAgents: React.FC = () => (
  <div className="">
    <Row gutter={16}>
      <Col
        className="flex justify-center items-center border-r border-solid border-gray"
        span={4}
      >
        <h4 className="text-xl capitalize text-center">Agent Status</h4>
      </Col>

      <Col className="border-r border-solid border-gray " span={5}>
        <Statistic
          title={
            <div className="flex">
              <Badge status="success" />
              <p className="ml-2 opacity-70 font-bold"> Online</p>
            </div>
          }
          value={0}
        />
      </Col>
      <Col span={5}>
        <Statistic
          title={
            <div className="flex">
              <Badge status="error" />
              <p className="ml-2 opacity-70 font-bold"> Offline</p>
            </div>
          }
          value={3}
        />
      </Col>
    </Row>
  </div>
);

export default StatisticAgents;

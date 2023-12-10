"use client";
import React, { useState, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.css";
import { ALERT } from "@/types/alert";
import API_URL from "@/helpers/api-url";
import { customAxiosGet } from "@/helpers/custom-axios";
import formatDateString from "@/helpers/format-date";
import ReactJson from "react-json-view";
const columns: ColumnsType<ALERT> = [
  {
    title: "Agent",
    dataIndex: "agent_id",
    key: "agent_id",
  },
  {
    title: "MAC",
    dataIndex: "mac",
    key: "mac",
  },
  {
    title: "Local IP ",
    dataIndex: "local_ip",
    key: "local_ip",
  },
  {
    title: "Alert Type",
    dataIndex: "alert_type",
    key: "alert_type",
  },
  {
    title: "Event Name",
    dataIndex: "event_name",
    key: "event_name",
  },
  {
    title: "Alert Name",
    dataIndex: "alert_name",
    key: "alert_name",
  },
  {
    title: "Alert level",
    dataIndex: "alert_level",
    key: "alert_level",
    render: (event_level) => {
      switch (event_level) {
        case 1:
          return <Tag color="success">Low</Tag>;
        case 2:
          return <Tag color="warning">Hight</Tag>;
        default:
          return <Tag color="error">Critical</Tag>;
      }
    },
  },
  {
    title: "Alert description",
    dataIndex: "alert_description",
    key: "alert_description",
  },
  {
    title: "Time",
    dataIndex: "created_at",
    key: "created_at",
    render: (item) => {
      return formatDateString(item);
    },
  },
];

const DataGrid: React.FC = () => {
  const [events, setEventList] = useState<ALERT[]>([] as ALERT[]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let url = API_URL.ALERTS.GET_ALERTS;
    let getData = async () => {
      setLoading(true);
      let resData: {
        success: boolean;
        alerts: ALERT[];
      } = await customAxiosGet(url);

      if (resData.success) {
        setEventList(resData.alerts);
        setLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <Table
      loading={loading}
      expandable={{
        expandedRowRender: (record) => (
          <>
            {" "}
            <p className="mt-2">
              <Tag color="#87d068"> Alert Description: </Tag>
              {record.alert_description}
            </p>
            <p className="mt-2">
              <Tag color="#87d068">Artifact Name: </Tag>
              {record.artifact_name}
            </p>
            <p className="mt-2">
              <ReactJson
                quotesOnKeys={false}
                displayDataTypes={false}
                name="Alert Info"
                src={JSON.parse(record.alert_info)}
                theme="ocean"
              />{" "}
              {}
            </p>
          </>
        ),
      }}
      className="dark:border-strokedark dark:bg-boxdark"
      columns={columns}
      dataSource={events}
    />
  );
};

export default DataGrid;

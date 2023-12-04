"use client";
import React, { useState, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.css";
import { EVENT } from "@/types/event";
import API_URL from "@/helpers/api-url";
import { customAxiosGet } from "@/helpers/custom-axios";
import formatDateString from "@/helpers/format-date";
const columns: ColumnsType<EVENT> = [
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
    title: "Event Type",
    dataIndex: "event_type",
    key: "event_type",
  },
  {
    title: "Event Name",
    dataIndex: "event_name",
    key: "event_name",
  },
  {
    title: "Event Name",
    dataIndex: "event_name",
    key: "event_name",
  },
  {
    title: "Event level",
    dataIndex: "event_level",
    key: "event_level",
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
    title: "Event description",
    dataIndex: "event_description",
    key: "event_description",
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
  const [events, setEventList] = useState<EVENT[]>([] as EVENT[]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let url = API_URL.EVENTS.GET_EVENTS;

    let getData = async () => {
      setLoading(true);
      let resData: {
        success: boolean;
        events: EVENT[];
      } = await customAxiosGet(url);

      if (resData.success) {
        setEventList(resData.events);
        setLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <Table
      loading={loading}
      className="dark:border-strokedark dark:bg-boxdark"
      columns={columns}
      dataSource={events}
    />
  );
};

export default DataGrid;

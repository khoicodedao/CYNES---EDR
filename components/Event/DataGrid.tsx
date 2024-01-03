"use client";
import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.css";
import { EVENT } from "@/types/event";
import API_URL from "@/helpers/api-url";
import { customAxiosPost } from "@/helpers/custom-axios";
import formatDateString from "@/helpers/format-date";
import getHeightScroll from "@/helpers/get-height-scroll";
import ReactJson from "react-json-view";
const columns: ColumnsType<EVENT> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
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
  const [filter, setFilter] = useState({ page_no: 1, page_size: 100 });
  useEffect(() => {
    let url = API_URL.EVENTS.GET_EVENTS;
    let getData = async () => {
      setLoading(true);
      let resData: {
        success: boolean;
        events: EVENT[];
      } = await customAxiosPost(url, filter);
      if (resData.success) {
        setEventList(
          resData.events.map((data, index) => {
            return { ID: index, ...data };
          })
        );
        setLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <>
      <Table
        rowKey="ID"
        loading={loading}
        // bordered
        expandable={{
          expandedRowRender: (record) => (
            <div>
              {" "}
              <p className="mt-2">
                <Tag color="#87d068"> Event Description: </Tag>
                {record.event_description}
              </p>
              <p className="mt-2">
                <Tag color="#87d068">Artifact Name: </Tag>
                {record.artifact_name}
              </p>
              <p className="mt-2">
                <Tag color="#87d068">Mitre Tactic: </Tag>
                {record.mitre_tactic}
              </p>
              <p className="mt-2">
                <Tag color="#87d068">Mitre Technique: </Tag>
                {record.mitre_technique}
              </p>
              <p className="mt-2">
                <ReactJson
                  quotesOnKeys={false}
                  displayDataTypes={false}
                  name="Event Info"
                  src={JSON.parse(record.event_info)}
                  theme="ocean"
                />{" "}
                {}
              </p>
            </div>
          ),
        }}
        className="dark:border-strokedark dark:bg-boxdark"
        columns={columns}
        dataSource={events}
        scroll={{ y: getHeightScroll() }}
        pagination={{
          pageSize: 40,
          total: 100, //response first filter require total
          onChange: (page, pageSize) => {
            // fetchRecords(page, pageSize);
          },
        }}
        // pagination={{ position: [Tab, bottom] }}
      ></Table>
    </>
  );
};

export default DataGrid;

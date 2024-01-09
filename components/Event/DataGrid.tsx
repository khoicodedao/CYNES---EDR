"use client";
import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Tabs } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.css";
import { EVENT } from "@/types/event";
import API_URL from "@/helpers/api-url";
import { customAxiosPost } from "@/helpers/custom-axios";
import formatDateString from "@/helpers/format-date";
import getHeightScroll from "@/helpers/get-height-scroll";
import dayjs from "dayjs";
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
    width: 120,
  },
  {
    title: "MAC",
    dataIndex: "mac",
    key: "mac",
    width: 120,
  },
  {
    title: "Local IP ",
    dataIndex: "local_ip",
    key: "local_ip",
    width: 120,
  },
  {
    title: "Event Type",
    dataIndex: "event_type",
    key: "event_type",
    width: 120,
  },
  {
    title: "Event Name",
    dataIndex: "event_name",
    key: "event_name",
    width: 120,
  },
  {
    title: "Event Name",
    dataIndex: "event_name",
    key: "event_name",
    width: 120,
  },
  {
    title: "Event level",
    dataIndex: "event_level",
    key: "event_level",
    width: 120,
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
    width: 440,
  },
  {
    title: "Time",
    dataIndex: "created_at",
    key: "created_at",
    fixed: "right",
    width: 200,
    render: (item) => {
      return formatDateString(item);
    },
  },
];

type DataGridProps = {
  timeRange?: string[];
  search?: string;
};

const DataGrid: React.FC<DataGridProps> = ({ timeRange, search }) => {
  const [events, setEventList] = useState<EVENT[]>([] as EVENT[]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<any>({ page_no: 1, page_size: 100 });
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
  }, [timeRange, search]);
  return (
    <>
      <Table
        rowKey="ID"
        loading={loading}
        // bordered
        expandable={{
          expandedRowRender: (record) => (
            <Tabs
              type="card"
              items={[
                {
                  label: `SUMMARY`,
                  key: "1",
                  children: (
                    <>
                      <p className="mt-2">
                        <Tag color="#87d068"> Event Description: </Tag>
                        <span className="dark:text-white">
                          {record.event_description}
                        </span>
                      </p>
                      <p className="mt-2">
                        <Tag color="#87d068">Artifact Name: </Tag>
                        <span className="dark:text-white">
                          {record.artifact_name}
                        </span>
                      </p>
                      <p className="mt-2">
                        <Tag color="#87d068">Mitre Tactic: </Tag>
                        <span className="dark:text-white">
                          {record.mitre_tactic}
                        </span>
                      </p>
                      <p className="mt-2">
                        <Tag color="#87d068">Mitre Technique: </Tag>
                        <span className="dark:text-white">
                          {record.mitre_technique}
                        </span>
                      </p>
                    </>
                  ),
                },
                {
                  label: `JSON`,
                  key: "2",
                  children: (
                    <p className="mt-2">
                      <ReactJson
                        quotesOnKeys={false}
                        displayDataTypes={false}
                        name="Event Info"
                        src={JSON.parse(record.event_info)}
                        theme="ocean"
                      />
                    </p>
                  ),
                },
              ]}
            />
          ),
        }}
        className="dark:border-strokedark dark:bg-boxdark"
        columns={columns}
        dataSource={events}
        scroll={{ y: getHeightScroll(), x: 1000 }}
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

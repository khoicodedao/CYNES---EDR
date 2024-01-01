"use client";
import React, { useState, useEffect } from "react";
import { Space, Table, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.css";
import { COMMAND } from "@/types/command";
import API_URL from "@/helpers/api-url";
import { customAxiosGet } from "@/helpers/custom-axios";
import formatDateString from "@/helpers/format-date";
import ReactJson from "react-json-view";

const columns: ColumnsType<COMMAND> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Command Name",
    dataIndex: "command_name",
    key: "command_name",
  },
  {
    title: "Command Type",
    dataIndex: "command_type",
    key: "command_type",
  },
  {
    title: "Command Info",
    dataIndex: "command_info",
    key: "command_info",
    width: "40%",
    render: (item) => {
      return (
        <ReactJson
          quotesOnKeys={false}
          displayDataTypes={false}
          name="Command Info"
          src={item}
          theme="ocean"
        />
      );
    },
  },
  {
    title: "Update at",
    dataIndex: "update_at",
    key: "update_at",
    render: (item) => {
      return formatDateString(item);
    },
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
    render: (item) => {
      return formatDateString(item);
    },
  },
];
const DataGrid: React.FC = () => {
  const [groups, setGroupList] = useState<COMMAND[]>([] as COMMAND[]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ page_no: 1, page_size: 100 });
  useEffect(() => {
    let url = API_URL.COMMANDS.GET_COMMANDS;
    let getData = async () => {
      setLoading(true);
      let resData: {
        success: boolean;
        commands: COMMAND[];
      } = await customAxiosGet(url, filter);
      if (resData.success) {
        setGroupList(resData.commands);
        setLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <>
      <Table
        loading={loading}
        className="dark:border-strokedark dark:bg-boxdark"
        columns={columns}
        dataSource={groups}
        pagination={{
          pageSize: 40,
          total: 100, //response first filter require total
          onChange: (page, pageSize) => {
            // fetchRecords(page, pageSize);
          },
        }}
      ></Table>
    </>
  );
};

export default DataGrid;

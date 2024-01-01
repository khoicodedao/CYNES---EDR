"use client";
import React, { useState, useEffect } from "react";
import { Space, Table, Select, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.css";
import { TASK } from "@/types/task";
import API_URL from "@/helpers/api-url";
import { customAxiosGet } from "@/helpers/custom-axios";
import formatDateString from "@/helpers/format-date";
const columns: ColumnsType<TASK> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Group ID",
    dataIndex: "group_id",
    key: "group_id",
  },
  {
    title: "Command Id",
    dataIndex: "command_id",
    key: "command_id",
  },
  {
    title: "Command Name",
    dataIndex: "command_name",
    key: "command_name",
  },
  {
    title: "Active",
    dataIndex: "is_active",
    key: "is_active",
    render: (is_active) => {
      return is_active ? (
        <Tag color="success">Active</Tag>
      ) : (
        <Tag color="error">Not Active</Tag>
      );
    },
  },
  {
    title: "Create at",
    dataIndex: "created_at",
    key: "created_at",
    render: (item) => {
      return formatDateString(item);
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
];
const DataGrid: React.FC = () => {
  const [tasks, setTaskList] = useState<TASK[]>([] as TASK[]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ page_no: 1, page_size: 100 });
  useEffect(() => {
    let url = API_URL.TASKS.GET_TASKS;
    let getData = async () => {
      setLoading(true);
      let resData: {
        success: boolean;
        tasks: TASK[];
      } = await customAxiosGet(url, filter);
      if (resData.success) {
        setTaskList(resData.tasks);
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
        dataSource={tasks}
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

"use client";
import React, { useState, useEffect } from "react";
import { Space, Table, Select, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.css";
import { TASK } from "@/types/task";
import API_URL from "@/helpers/api-url";
import { customAxiosPost } from "@/helpers/custom-axios";
import formatDateString from "@/helpers/format-date";
import CONSTANT_DATA from "../common/constant";
import getHeightScroll from "@/helpers/get-height-scroll";

const columns: ColumnsType<TASK> = [
  {
    title: "ID",
    dataIndex: "ID",
    key: "ID",
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
    dataIndex: "updated_at",
    key: "updated_at",
    render: (item) => {
      return formatDateString(item);
    },
  },
];
type DataGridProps = {
  timeRange?: string[];
  search?: { field: string; operator: string; value: string }[];
};
const DataGrid: React.FC<DataGridProps> = ({ timeRange, search }) => {
  const [tasks, setTaskList] = useState<TASK[]>([] as TASK[]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setFilter] = useState<any>(CONSTANT_DATA.PAGINATION);
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
  if (search) {
    filter["filter"] = [...filter["filter"], ...search]; //Add filter time range and search
  }
  Object.assign(filter, CONSTANT_DATA.REQUIRED_TOTAL);
  useEffect(() => {
    let url = API_URL.TASKS.GET_TASKS;
    let getData = async () => {
      setLoading(true);
      let resData: {
        success: boolean;
        tasks: TASK[];
        count: number;
      } = await customAxiosPost(url, filter);
      if (resData.success) {
        setTotalCount(resData.count);
        setTaskList(
          resData.tasks.map((data, index) => {
            return {
              ID:
                (filter.page_no - 1) * CONSTANT_DATA.PAGINATION.page_size +
                index +
                1,
              ...data,
            };
          })
        );
        setLoading(false);
      }
    };
    getData();
  }, [timeRange, search, filter]);
  return (
    <>
      <Table
        loading={loading}
        className="dark:border-strokedark dark:bg-boxdark"
        columns={columns}
        dataSource={tasks}
        scroll={{ y: getHeightScroll(), x: 1000 }}
        pagination={{
          hideOnSinglePage: true,
          pageSize: CONSTANT_DATA.PAGINATION.page_size,
          total: totalCount, //response first filter require total
          onChange: (page, pageSize) => {
            setFilter({ ...filter, page_no: page });
          },
        }}
      ></Table>
    </>
  );
};

export default DataGrid;

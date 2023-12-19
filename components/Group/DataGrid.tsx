"use client";
import React, { useState, useEffect } from "react";
import { Space, Table, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.css";
import { GROUP, GROUP_FILTER } from "@/types/group";
import API_URL from "@/helpers/api-url";
import { customAxiosGet } from "@/helpers/custom-axios";
import formatDateString from "@/helpers/format-date";
const columns: ColumnsType<GROUP> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Group Name",
    dataIndex: "group_name",
    key: "group_name",
  },
  {
    title: "Group Filter",
    dataIndex: "group_filter",
    key: "group_filter",
    render: (group_filter) => {
      return group_filter.map((item: GROUP_FILTER, index: number) => {
        return (
          <Select
            className="ml-1"
            disabled
            key={index}
            mode="multiple"
            defaultValue={Object.values(item)}
          />
        );
      });
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
  const [groups, setGroupList] = useState<GROUP[]>([] as GROUP[]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ page_no: 1, page_size: 100 });
  useEffect(() => {
    let url = API_URL.GROUPS.GET_GROUPS;
    let getData = async () => {
      setLoading(true);
      let resData: {
        success: boolean;
        groups: GROUP[];
      } = await customAxiosGet(url, filter);
      if (resData.success) {
        setGroupList(resData.groups);
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

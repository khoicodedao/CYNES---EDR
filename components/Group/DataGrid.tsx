"use client";
import React, { useState, useEffect } from "react";
import { Tag, Table, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.css";
import { GROUP, GROUP_FILTER } from "@/types/group";
import API_URL from "@/helpers/api-url";
import { customAxiosPost } from "@/helpers/custom-axios";
import formatDateString from "@/helpers/format-date";
import getHeightScroll from "@/helpers/get-height-scroll";
import CONSTANT_DATA from "../common/constant";
const columns: ColumnsType<GROUP> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 100,
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
    width: 480,
    render: (group_filter) => {
      return group_filter.map((item: GROUP_FILTER, index: number) => {
        return (
          <Tag key={index} className="filter">
            {Object.values(item).toString().replaceAll(",", "")}
          </Tag>
        );
      });
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
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
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
  const [groups, setGroupList] = useState<GROUP[]>([] as GROUP[]);
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
    let url = API_URL.GROUPS.GET_GROUPS;
    let getData = async () => {
      setLoading(true);
      let resData: {
        success: boolean;
        groups: GROUP[];
      } = await customAxiosPost(url, filter);
      if (resData.success) {
        setGroupList(resData.groups);
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
        dataSource={groups}
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

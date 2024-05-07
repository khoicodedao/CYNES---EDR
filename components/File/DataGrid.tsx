"use client";
import React, { useState, useEffect } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.css";
import API_URL from "@/helpers/api-url";
import { customAxiosPost } from "@/helpers/custom-axios";
import formatDateString from "@/helpers/format-date";
import CONSTANT_DATA from "../common/constant";
import getHeightScroll from "@/helpers/get-height-scroll";
import { FILE } from "@/types/file";
type DataGridProps = {
  timeRange?: string[];
  search?: { field: string; operator: string; value: string }[];
};
const DataGrid: React.FC<DataGridProps> = ({ timeRange, search }) => {
  const columns: ColumnsType<FILE> = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      width: 60,
      align: "center",
    },
    {
      title: "File Name",
      dataIndex: "file_name",
      key: "file_name",
      width: 120,
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "role",
      width: 120,
    },
    {
      title: "Create at",
      dataIndex: "created_at",
      key: "created_at",
      render: (item) => {
        return formatDateString(item);
      },
      width: 200,
    },
  ];

  const [files, setFilesList] = useState<FILE[]>([] as FILE[]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setFilter] = useState<any>(CONSTANT_DATA.PAGINATION);

  useEffect(() => {
    let url = API_URL.FILES.GET_FILES;
    let getData = async () => {
      setLoading(true);
      let resData: {
        success: boolean;
        files: FILE[];
        count: number;
      } = await customAxiosPost(url, {});
      if (resData.success) {
        setTotalCount(resData.count);
        setFilesList(
          resData.files.map((data, index) => {
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
        dataSource={files}
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

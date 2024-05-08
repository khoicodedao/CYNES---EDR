"use client";
import React, { useState, useEffect } from "react";
import { DownloadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.css";
import API_URL from "@/helpers/api-url";
import {
  customAxiosGet,
  customAxiosPost,
  customAxiosDelete,
} from "@/helpers/custom-axios";
import formatDateString from "@/helpers/format-date";
import CONSTANT_DATA from "../common/constant";
import getHeightScroll from "@/helpers/get-height-scroll";
import { FILE } from "@/types/file";
type DataGridProps = {
  timeRange?: string[];
  search?: { field: string; operator: string; value: string }[];
};
type NotificationType = "success" | "info" | "warning" | "error";

const DataGrid: React.FC<DataGridProps> = ({ timeRange, search }) => {
  const [reload, setReload] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: NotificationType, data: string) => {
    api[type]({
      message: type,
      description: data,
      placement: "bottomRight",
    });
  };
  const deleteFile = async (id: string) => {
    let url = API_URL.FILES.GET_FILES + `/${id}`;
    let res: { error: boolean; msg: string } = await customAxiosDelete(url);
    if (res.error) {
      openNotificationWithIcon("error", res.msg);
    } else {
      openNotificationWithIcon("success", res.msg);
      setReload(!reload);
    }
  };
  const downloadFile = async (id: string) => {
    let url = API_URL.FILES.GET_FILES + `/${id}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };
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
      title: "Create at",
      dataIndex: "created_at",
      key: "created_at",
      render: (item) => {
        return formatDateString(item);
      },
      width: 200,
    },
    {
      title: "Action",
      dataIndex: "ID",
      key: "ID",
      width: 120,
      align: "center",
      render: (item, record) => {
        return (
          <div className="flex justify-center items-center">
            <DownloadOutlined
              onClick={() => {
                downloadFile(item + "," + record.file_name);
              }}
              className="w-1/3 center"
            />
            <DeleteOutlined
              onClick={() => {
                deleteFile(item);
              }}
              className="w-1/3 center"
            />
          </div>
        );
      },
    },
  ];

  const [files, setFilesList] = useState<FILE[]>([] as FILE[]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setFilter] = useState<any>(CONSTANT_DATA.PAGINATION);
  filter["filter"] = [
    {
      field: "type",
      operator: "=",
      value: "upload",
    },
  ];
  useEffect(() => {
    let url = API_URL.FILES.GET_FILES;
    let getData = async () => {
      setLoading(true);
      let resData: {
        success: boolean;
        files: FILE[];
        count: number;
      } = await customAxiosPost(url, filter);

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
  }, [timeRange, search, filter, reload]);
  return (
    <>
      {contextHolder}
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

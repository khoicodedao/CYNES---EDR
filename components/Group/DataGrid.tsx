"use client";
import React, { useState, useEffect } from "react";
import { Tag, Table, notification, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.css";
import { GROUP, GROUP_FILTER } from "@/types/group";
import API_URL from "@/helpers/api-url";
import { customAxiosPost } from "@/helpers/custom-axios";
import formatDateString from "@/helpers/format-date";
import getHeightScroll from "@/helpers/get-height-scroll";
import CONSTANT_DATA from "../common/constant";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ModalCRUD from "./ModalCRUD";
type NotificationType = "success" | "info" | "warning" | "error";
type DataGridProps = {
  timeRange?: string[];
  search?: { field: string; operator: string; value: string }[];
};
const DataGrid: React.FC<DataGridProps> = ({ timeRange, search }) => {
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
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 120,
      render: ({ group_name, group_filter, id }) => {
        return (
          <div className="flex justify-center items-center">
            <PlusOutlined
              onClick={() => {
                showModal("create");
                setDataEdit({ group_name: "", group_filter: [], id: 0 });
              }}
              className="w-1/3"
            />
            <EditOutlined
              onClick={() => {
                showModal("edit");
                setDataEdit({ group_name, group_filter, id });
              }}
              className="w-1/3"
            />
            <Popconfirm
              title="Delete the group"
              description="Are you sure to delete this group?"
              onConfirm={async () => {
                let urlDelete = API_URL.GROUPS.DELETE_GROUP;
                let res: { error: boolean; msg: string } =
                  await customAxiosPost(urlDelete, { id: id });
                if (res.error) {
                  openNotificationWithIcon("error", res.msg);
                } else {
                  openNotificationWithIcon("success", res.msg);
                  setReload(!reload);
                }
              }}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined className="w-1/3" />
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const [reload, setReload] = useState(false);
  const [dataEdit, setDataEdit] = useState<{
    id: number;
    group_name: string;
    group_filter: GROUP_FILTER[];
  }>(
    {} as {
      id: number;
      group_name: string;
      group_filter: GROUP_FILTER[];
    }
  );
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: NotificationType, data: string) => {
    api[type]({
      message: type,
      description: data,
      placement: "bottomRight",
    });
  };
  // Open model to run action CRUD
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (type: "create" | "edit" | "delete") => {
    setType(type);
    if (type == "edit") {
    }
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //===========================
  const [groups, setGroupList] = useState<GROUP[]>([] as GROUP[]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<"create" | "edit" | "delete">("create");
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
        total_count: number;
      } = await customAxiosPost(url, filter);
      if (resData.success) {
        setTotalCount(resData.total_count);
        setGroupList(resData.groups);
        setLoading(false);
      }
    };
    getData();
  }, [timeRange, search, filter, reload]);
  return (
    <>
      {contextHolder}
      <ModalCRUD
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        type={type}
        setReload={setReload}
        dataEdit={dataEdit}
      ></ModalCRUD>
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

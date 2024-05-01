"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import getHeightScroll from "@/helpers/get-height-scroll";
import "./index.css";
import { ALERT } from "@/types/alert";
import API_URL from "@/helpers/api-url";
import { customAxiosPost } from "@/helpers/custom-axios";
import formatDateString from "@/helpers/format-date";
import ReactJson from "react-json-view";
import CONSTANT_DATA from "../common/constant";
const columns: ColumnsType<ALERT> = [
  {
    title: "ID",
    dataIndex: "ID",
    key: "ID",
    width: 150,
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
    width: 180,
  },
  {
    title: "Local IP ",
    dataIndex: "local_ip",
    key: "local_ip",
    width: 120,
  },
  {
    title: "Alert Type",
    dataIndex: "alert_type",
    key: "alert_type",
    width: 200,
  },

  {
    title: "Alert Name",
    dataIndex: "alert_name",
    key: "alert_name",
    width: 120,
  },
  {
    title: "Alert level",
    dataIndex: "alert_level",
    key: "alert_level",
    width: 120,
    render: (alert_level) => {
      switch (alert_level) {
        case 1:
          return <Tag color="success">Low</Tag>;
        case 2:
          return <Tag color="warning">Medium</Tag>;
        default:
          return <Tag color="error">Hight</Tag>;
      }
    },
  },
  {
    title: "Alert description",
    dataIndex: "alert_description",
    key: "alert_description",
    width: 440,
  },
  {
    title: "Time",
    dataIndex: "created_at",
    key: "created_at",

    width: 200,
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
  const [alerts, setAlertList] = useState<ALERT[]>([] as ALERT[]);
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
    let url = API_URL.ALERTS.GET_ALERTS;
    let getData = async () => {
      setLoading(true);
      let resData: {
        success: boolean;
        alerts: ALERT[];
        count: number;
      } = await customAxiosPost(url, filter);

      if (resData.success) {
        setTotalCount(resData.count);
        setAlertList(
          resData.alerts.map((data, index) => {
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
    <Table
      rowKey="ID"
      loading={loading}
      bordered
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
                      <Tag color="#87d068"> Alert Description: </Tag>
                      <span className="dark:text-white">
                        {record.alert_description}
                      </span>
                    </p>
                    <p className="mt-2">
                      <Tag color="#87d068">Artifact Name: </Tag>
                      <span className="dark:text-white">
                        {record.artifact_name}
                      </span>
                    </p>
                  </>
                ),
              },
              {
                label: `JSON`,
                key: "2",
                children: (
                  <ReactJson
                    quotesOnKeys={false}
                    displayDataTypes={false}
                    name="Alert Info"
                    src={record.alert_info}
                    theme="ocean"
                  />
                ),
              },
            ]}
          />
        ),
      }}
      className="dark:border-strokedark dark:bg-boxdark"
      columns={columns}
      dataSource={alerts}
      scroll={{ y: getHeightScroll(), x: 1000 }}
      pagination={{
        hideOnSinglePage: true,
        pageSize: CONSTANT_DATA.PAGINATION.page_size,
        total: totalCount, //response first filter require total
        onChange: (page, pageSize) => {
          setFilter({ ...filter, page_no: page });
        },
      }}
    />
  );
};

export default DataGrid;

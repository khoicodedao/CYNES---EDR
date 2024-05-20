"use client";
import React, { useState, useEffect } from "react";
import { Table, Tag, Tabs } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.css";
import { EVENT } from "@/types/event";
import API_URL from "@/helpers/api-url";
import { customAxiosPost } from "@/helpers/custom-axios";
import formatDateString from "@/helpers/format-date";
import getHeightScroll from "@/helpers/get-height-scroll";
import { Drawer } from "antd";
import ReactJson from "react-json-view";
import CONSTANT_DATA from "../common/constant";
const columns: ColumnsType<EVENT> = [
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
    align: "center",
  },
  {
    title: "Local IP ",
    dataIndex: "local_ip",
    key: "local_ip",
    width: 180,
    align: "center",
  },
  {
    title: "Event Type",
    dataIndex: "event_type",
    key: "event_type",
    width: 120,
    align: "center",
  },
  {
    title: "Event Name",
    dataIndex: "event_name",
    key: "event_name",
    width: 120,
    align: "center",
  },
  {
    title: "Event level",
    dataIndex: "event_level",
    key: "event_level",
    width: 120,
    align: "center",
    render: (event_level) => {
      switch (event_level) {
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
  search?: { field: string; operator: string; value: string }[];
};

const DataGrid: React.FC<DataGridProps> = ({ timeRange, search }) => {
  const [record, setRecord] = useState<EVENT>({} as EVENT);
  const [open, setOpen] = useState(false);
  const [events, setEventList] = useState<EVENT[]>([] as EVENT[]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setFilter] = useState<any>(CONSTANT_DATA.PAGINATION);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  //=== End ====
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
    let url = API_URL.EVENTS.GET_EVENTS;
    let getData = async () => {
      setLoading(true);
      let resData: {
        success: boolean;
        events: EVENT[];
        count: number;
      } = await customAxiosPost(url, filter);
      if (resData.success) {
        setTotalCount(resData.count);
        setEventList(
          resData.events.map((data, index) => {
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
      <Drawer
        title="Detail"
        onClose={onClose}
        open={open}
        placement={"right"}
        width={800}
      >
        <Tabs
          className="mt-4 ml-2"
          type="card"
          items={[
            {
              label: `SUMMARY`,
              key: "1",
              children: (
                <>
                  <p className="mt-2">
                    <Tag color="#0B5970"> Event Description: </Tag>
                    <span className="dark:text-white">
                      {record.event_description}
                    </span>
                  </p>
                  <p className="mt-2">
                    <Tag color="#0B5970">Artifact Name: </Tag>
                    <span className="dark:text-white">
                      {record.artifact_name}
                    </span>
                  </p>
                  <p className="mt-2">
                    <Tag color="#0B5970">Mitre Tactic: </Tag>
                    <span className="dark:text-white">
                      {record.mitre_tactic}
                    </span>
                  </p>
                  <p className="mt-2">
                    <Tag color="#0B5970">Mitre Technique: </Tag>
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
                    src={record.event_info}
                    theme="ocean"
                  />
                </p>
              ),
            },
          ]}
        />
      </Drawer>
      <Table
        rowKey="ID"
        loading={loading}
        // bordered
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: (event) => {
              showDrawer();
              setRecord({ ...record });
            },
          };
        }}
        className="dark:border-strokedark dark:bg-boxdark"
        columns={columns}
        dataSource={events}
        scroll={{ y: getHeightScroll(), x: 1000 }}
        pagination={{
          hideOnSinglePage: true,
          pageSize: CONSTANT_DATA.PAGINATION.page_size,
          total: totalCount, //response first filter require total
          onChange: (page, pageSize) => {
            setFilter({ ...filter, page_no: page });
          },
        }}
        // pagination={{ position: [Tab, bottom] }}
      ></Table>
    </>
  );
};

export default DataGrid;

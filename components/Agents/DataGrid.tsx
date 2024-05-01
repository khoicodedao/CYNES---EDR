"use client";
import React, { useState, useEffect } from "react";
import { DownOutlined, SettingOutlined, MenuOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Select, List } from "antd";
import { Space, Table, Tag, Tabs, Progress } from "antd";
import { Button, Drawer, Divider } from "antd";
import { ApiOutlined } from "@ant-design/icons";
import { AGENT } from "@/types/agent";
import { customAxiosPost } from "@/helpers/custom-axios";
import "./index.css";
import getHeightScroll from "@/helpers/get-height-scroll";
import API_URL from "@/helpers/api-url";
import formatDateString from "@/helpers/format-date";
import CONSTANT_DATA from "../common/constant";
const checkOnline = (lastSeen: string) => {
  const inputTime = new Date(lastSeen);
  const currentTime = new Date();
  const fiveMinutesAgo = new Date(currentTime.getTime() - 5 * 60 * 1000);
  // Compare the input time with the current time
  if (inputTime > fiveMinutesAgo) {
    return (
      <p>
        <Tag color="#87d068">Online</Tag>Agent detail
      </p>
    );
  } else {
    return (
      <p>
        <Tag color="#ff4d4f">Offline</Tag>Agent detail
      </p>
    );
  }
};
function extractNumericValue(inputString: string) {
  if (inputString == "") {
    return 0;
  }
  var match = inputString.match(/\(([^)]+)\)$/);
  if (match) {
    var numericValue = parseInt(match[1], 10);
    return numericValue;
  } else {
    return 0;
  }
}
type DataGridProps = {
  timeRange?: string[];
  search?: { field: string; operator: string; value: string }[];
};
const DataGrid: React.FC<DataGridProps> = ({ timeRange, search }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingRemote, setLoadingRemote] = useState<boolean>(false);
  const [agentList, setAgentList] = useState<AGENT[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [agentDrawer, setAgentDrawer] = useState<AGENT>({} as AGENT); //set data when dupble click in table row
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
  // === Drawer ====
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  //=== End ====
  const columns: TableColumnsType<AGENT> = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      width: 90,
    },
    { title: "MAC", dataIndex: "mac", key: "mac", width: 180 },

    { title: "Local IP", dataIndex: "local_ip", key: "local_ip", width: 150 },
    {
      title: "Public IP",
      dataIndex: "public_ip",
      key: "public_ip",
      width: 120,
    },
    {
      title: "Computer Name",
      dataIndex: "computer_name",
      key: "computer_name",
      width: 200,
    },
    { title: "OS", dataIndex: "os", key: "os", width: 120 },
    { title: "RAM", dataIndex: "ram", key: "ram", width: 250 },
    { title: "CPU", dataIndex: "cpu", key: "cpu", width: 350 },
    {
      title: "Version",
      dataIndex: "agent_version",
      key: "agent_version",
      width: 120,
    },
    {
      title: "Agent install",
      dataIndex: "agent_first_install",
      key: "agent_first_install",
      width: 120,
    },
    {
      title: "User",
      dataIndex: "agent_user",
      key: "agent_user",
      width: 120,
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

  const remote = async (id: string) => {
    let url = API_URL.AGENT.REMOTE_AGENT;
    let params = {
      id: id,
      require_remote: true,
    };
    setLoadingRemote(true);
    let resData: {
      success: boolean;
      msg: string;
    } = await customAxiosPost(url, params);
    setLoadingRemote(false);
    if (resData.success) {
      window.open("/control-directly", "_blank", "noopener,noreferrer");
    }
  };
  useEffect(() => {
    let url = API_URL.AGENT.GET_AGENTS;
    let getData = async () => {
      setLoading(true);
      let resData: {
        success: boolean;
        data: { agents: AGENT[] };
        count: number;
      } = await customAxiosPost(url, filter);
      if (resData.success) {
        setAgentList(
          resData.data.agents.map((data, index) => {
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
  //

  return (
    <>
      {/* Show Drawer content in the rightside  */}
      <Drawer
        title={checkOnline(agentDrawer?.last_seen || "undefine")}
        placement={"right"}
        width={1000}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button
              type="primary"
              icon={<ApiOutlined />}
              loading={loadingRemote}
              size={"large"}
              danger
              onClick={() => setLoadingRemote((prev) => !prev)}
            >
              Remote
            </Button>
          </Space>
        }
      >
        {/* Drawer content */}
        <div className=" pl-2 w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center dark:opacity-50  dark:bg-boxdark">
            <p>
              Create At:{" "}
              {formatDateString(agentDrawer?.agent_first_install || "")}
            </p>{" "}
            <Divider className="bg-black-90 dark:bg-white " type="vertical" />{" "}
            <p>Last Seen: {formatDateString(agentDrawer?.last_seen || "")}</p>
          </div>
        </div>
        {/* Properties */}
        <div className="w-full p-6 mt-2 max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="font-bold mb-2">
            <SettingOutlined className="mr-1" />
            Properties
          </div>
          <div className="grid grid-cols-3 ">
            <div>
              <p>
                Model:
                <Tag color="#87d068">{agentDrawer.model}</Tag>
              </p>
            </div>
            <div>
              <p>
                Manufacturer:
                <Tag color="#87d068">{agentDrawer.manufacturer}</Tag>
              </p>
            </div>
            <div>
              <p>
                Tags:
                <Tag color="#87d068">{agentDrawer.tags}</Tag>
              </p>
            </div>
          </div>
        </div>
        {/* end */}

        {/* Agent detail */}
        <div className="w-full p-6 mt-2 max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="font-bold mb-2">
            <MenuOutlined className="mr-1" />
            About Agent: <Tag color="#87d068">{agentDrawer.mac}</Tag>
          </div>
          <Tabs
            // onChange={onChange}
            className="dark:text-white"
            type="card"
            items={[
              {
                label: `Detail`,
                key: "1",
                children: (
                  <List
                    bordered
                    dataSource={[
                      `MAC: ${agentDrawer.mac}`,
                      `Local IP: ${agentDrawer.local_ip}`,
                      `Public IP: ${agentDrawer.public_ip}`,
                      `Computer Name: ${agentDrawer.computer_name}`,
                      `Motherboard Serial: ${agentDrawer.motherboard_serial}`,
                      `OS: ${agentDrawer.os}`,
                    ]}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                  />
                ),
              },
              {
                label: `Network card`,
                key: "2",
                children: (
                  <Table
                    bordered
                    dataSource={agentDrawer.network_cards}
                    columns={[
                      {
                        title: "MAC",
                        dataIndex: "mac",
                        key: "mac",
                      },
                      {
                        title: "IP",
                        dataIndex: "ip",
                        key: "ip",
                      },
                      {
                        title: "Description",
                        dataIndex: "description",
                        key: "description",
                      },
                    ]}
                  />
                ),
              },
              {
                label: `Software Info`,
                key: "3",
                children: (
                  <Table
                    bordered
                    dataSource={agentDrawer.software_info}
                    columns={[
                      {
                        title: "Software name",
                        dataIndex: "name",
                        key: "name",
                      },
                      {
                        title: "Version",
                        dataIndex: "version",
                        key: "version",
                      },
                    ]}
                  />
                ),
              },

              {
                label: `Hardware`,
                key: "4",
                children: (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-300 p-4">
                      <span className="mr-4">CPU:</span>
                      <Progress
                        type="circle"
                        percent={extractNumericValue(agentDrawer.ram || "")}
                      />
                    </div>
                    <div className="bg-gray-300 p-4">
                      <span className="mr-4">RAM:</span>
                      <Progress
                        type="circle"
                        percent={extractNumericValue(agentDrawer?.cpu || "")}
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
        {/* end */}
      </Drawer>
      {/* ================= */}
      {/* Table content */}
      <Table
        loading={loading}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: (event) => {
              showDrawer();
              setAgentDrawer(record);
            },
          };
        }}
        columns={columns} //column name and title
        dataSource={agentList} //dataSource from useEffect
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
      {/* ================ */}
    </>
  );
};

export default DataGrid;

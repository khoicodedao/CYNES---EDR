"use client";
import React, { useState } from "react";
import { DownOutlined, SettingOutlined, MenuOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Select } from "antd";
import { Badge, Dropdown, Space, Table, Tag, Tabs } from "antd";
import { Button, Drawer, Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./index.css";
interface DataType {
  key: React.Key;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;
}

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}

const items = [
  { key: "1", label: "Action 1" },
  { key: "2", label: "Action 2" },
];

const DataGrid: React.FC = () => {
  // === Drawer ====
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  //=== End ====
  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: "Date", dataIndex: "date", key: "date" },
      { title: "Name", dataIndex: "name", key: "name" },
      {
        title: "Status",
        key: "state",
        render: () => <Badge status="success" text="Finished" />,
      },
      { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown menu={{ items }}>
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: "2014-12-24 23:12:00",
        name: "This is production name",
        upgradeNum: "Upgraded: 56",
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: TableColumnsType<DataType> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Platform", dataIndex: "platform", key: "platform" },
    { title: "Version", dataIndex: "version", key: "version" },
    { title: "Upgraded", dataIndex: "upgradeNum", key: "upgradeNum" },
    { title: "Creator", dataIndex: "creator", key: "creator" },
    { title: "Date", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Status",
      key: "operation",
      render: () => <Badge status="success" />,
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: "Screen",
      platform: "iOS",
      version: "10.3.4.5654",
      upgradeNum: 500,
      creator: "Jack",
      createdAt: "2014-12-24 23:12:00",
    });
  }

  return (
    <>
      <Drawer
        title={
          <p>
            <Tag color="#87d068">Running</Tag>Agents Receive task
          </p>
        }
        placement={"right"}
        width={1000}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              size={"large"}
              danger
            >
              Uninstall
            </Button>
          </Space>
        }
      >
        {/* Drawer content */}
        <div className=" pl-2 w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center dark:opacity-50  dark:bg-boxdark">
            <p className="mr-2">From: 17/8/2023 20:00:00</p> -{" "}
            <p className="ml-2">To: 17/8/2023 23:00:00</p>
          </div>
        </div>
        {/* Properties */}
        <div className="w-full p-6 mt-2 max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="font-bold mb-2">
            <SettingOutlined className="mr-1" />
            Command
          </div>
          <div className="grid grid-cols-3 ">
            <div>
              <p>Policy:</p>
              <Select
                defaultValue="lucy"
                style={{ width: 200 }}
                // onChange={handleChange}
                options={[
                  { value: "Policy", label: "Policy 1" },
                  { value: "lucy", label: "Policy" },
                  { value: "Yiminghe", label: "Policy" },
                  { value: "disabled", label: "Policy", disabled: true },
                ]}
              />
            </div>
            <div>
              <p>Update Group:</p>
              <Select
                defaultValue="lucy"
                style={{ width: 200 }}
                // onChange={handleChange}
                options={[
                  { value: "Group 1", label: "Group 1" },
                  { value: "lucy", label: "Policy" },
                  { value: "Yiminghe", label: "Policy" },
                  { value: "disabled", label: "Policy", disabled: true },
                ]}
              />
            </div>
            <div>
              <p>Group:</p>
              <Select
                defaultValue="lucy"
                style={{ width: 200 }}
                // onChange={handleChange}
                options={[
                  { value: "Group 2", label: "Group 2" },
                  { value: "lucy", label: "Policy" },
                  { value: "Yiminghe", label: "Policy" },
                  { value: "disabled", label: "Policy", disabled: true },
                ]}
              />
            </div>
          </div>
        </div>
        {/* end */}

        {/* Agent detail */}
        <div className="w-full p-6 mt-2 max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="font-bold mb-2">
            <MenuOutlined className="mr-1" />
            List Agents
          </div>
          <Tabs
            // onChange={onChange}
            className="dark:text-white"
            type="card"
            items={[
              {
                label: `Detail`,
                key: "1",
                children: `Content of Tab Detail ${1}`,
              },
              {
                label: `Installation Files Version`,
                key: "2",
                children: `Installation Files Version ${1}`,
              },
              {
                label: `Scheduled Tasks`,
                key: "3",
                children: `Content of Tab Scheduled Tasks ${1}`,
              },

              {
                label: `Disk & partitions`,
                key: "4",
                children: `Content of Tab Disk & partitions ${1}`,
              },
            ]}
          />
        </div>
        {/* end */}

        {/* end */}
      </Drawer>
      <Table
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: (event) => {
              showDrawer();
              console.log(event);
            },
          };
        }}
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={data}
      />
    </>
  );
};

export default DataGrid;

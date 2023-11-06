"use client";
import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Badge, Dropdown, Space, Table, Tag } from "antd";

import { Button, Drawer, Radio } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

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
    { title: "Action", key: "operation", render: () => <a>Publish</a> },
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
            <Tag color="#87d068">Online</Tag>Agent detail
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

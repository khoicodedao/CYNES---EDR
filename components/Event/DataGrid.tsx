import React from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./index.css";
interface DataType {
  key: string;
  id_agent: string;
  event_type: string;
  event_info: string;
  event_time: string;
  receive_time: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Agent",
    dataIndex: "id_agent",
    key: "id_agent",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Event Type",
    dataIndex: "event_type",
    key: "event_type",
  },
  {
    title: "Event Info",
    dataIndex: "event_info",
    key: "event_info",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.id_agent}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    id_agent: "John Brown",
    event_info: "32",
    event_type: "New York No. 1 Lake Park",
    event_time: "",
    receive_time: "",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    id_agent: "Jim Green",
    event_info: "32",
    event_type: "New York No. 1 Lake Park",
    event_time: "",
    receive_time: "",
    tags: ["loser"],
  },
  {
    key: "3",
    id_agent: "Joe Black",

    event_info: "32",
    event_type: "New York No. 1 Lake Park",
    event_time: "",
    receive_time: "",
    tags: ["cool", "teacher"],
  },
];

const DataGrid: React.FC = () => (
  <Table
    className="dark:border-strokedark dark:bg-boxdark"
    columns={columns}
    dataSource={data}
  />
);

export default DataGrid;

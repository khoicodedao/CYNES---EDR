import React from "react";
import { Table } from "antd";
import { LinkOutlined } from "@ant-design/icons";

const { Column } = Table;

interface DataType {
  id: string;
  toolName: string;
  link: string;
  description: string;
}

const data: DataType[] = [
  {
    id: "1",
    toolName: "Cyber Chef",
    link: "http://14.225.210.81/",
    description:
      "Một công cụ web mạnh mẽ và linh hoạt được sử dụng để thực hiện nhiều tác vụ xử lý dữ liệu và phân tích, bao gồm mã hóa, giải mã, mã hóa Base64, phân tích dữ liệu nhị phân, chuyển đổi định dạng và nhiều tác vụ khác",
  },
  {
    id: "2",
    toolName: "ELK",
    link: "http://14.225.210.81:5601/app/discover#/?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))&_a=(columns:!(),filters:!(),index:'25d625c0-48d5-11ef-97a5-55187b235bc3',interval:auto,query:(language:kuery,query:''),sort:!())",
    description:
      "Công cụ tìm kiếm và phân tích phân tán, mã nguồn mở, được thiết kế để xử lý và tìm kiếm dữ liệu phi cấu trúc trong thời gian thực",
  },
];

const Tools: React.FC = () => (
  <Table dataSource={data}>
    <Column title="ID" dataIndex="id" key="id" width={30} align="center" />
    <Column title="Tool Name" dataIndex="toolName" width={100} key="toolName" />
    <Column
      title="Description"
      dataIndex="description"
      width={500}
      key="description"
    />
    <Column
      title="Link"
      dataIndex="link"
      width={30}
      align="center"
      key="link"
      render={(link) => (
        <LinkOutlined
          onClick={() => window.open(link, "_blank", "noopener,noreferrer")}
        />
      )}
    />
  </Table>
);

export default Tools;

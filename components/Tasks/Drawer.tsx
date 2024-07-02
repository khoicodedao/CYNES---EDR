import React, { useState, useEffect, useMemo } from "react";
import { Table, Input } from "antd";
import type { ColumnsType } from "antd/es/table";

interface ReceiveAgentsProps {
  receive_agents: { [key: string]: string };
}

const ReceiveAgentsTable: React.FC<ReceiveAgentsProps> = ({
  receive_agents,
}) => {
  const [globalSearch, setGlobalSearch] = useState("");
  const [filteredData, setFilteredData] = useState<
    { key: string; value: string }[]
  >([]);

  useEffect(() => {
    const receiveAgentsData = Object.entries(receive_agents).map(
      ([key, value]) => ({
        key,
        value,
      })
    );
    setFilteredData(receiveAgentsData);
  }, [receive_agents]);

  const columns: ColumnsType<{ key: string; value: string }> = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Computer Name",
      dataIndex: "value",
      key: "value",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(40);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayData = useMemo(
    () =>
      filteredData
        .filter(
          (item) =>
            item.key.toLowerCase().includes(globalSearch.toLowerCase()) ||
            item.value.toLowerCase().includes(globalSearch.toLowerCase())
        )
        .slice(startIndex, endIndex),
    [filteredData, startIndex, endIndex, globalSearch]
  );

  return (
    <div className="p-4">
      <Input.Search
        placeholder="Search..."
        value={globalSearch}
        onChange={(e) => setGlobalSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Table
        columns={columns}
        dataSource={displayData}
        rowKey="key"
        pagination={{
          position: ["bottomLeft"],
          current: currentPage,
          pageSize,
          total: filteredData.filter(
            (item) =>
              item.key.toLowerCase().includes(globalSearch.toLowerCase()) ||
              item.value.toLowerCase().includes(globalSearch.toLowerCase())
          ).length,
          showTotal: (total) => (
            <p className="text-white pl-4">
              Total:{" "}
              <span className="text-xl" style={{ color: "rgb(38, 147, 245)" }}>
                {total}
              </span>{" "}
              items
            </p>
          ),
          onChange: (page, newPageSize) => {
            setCurrentPage(page);
            if (newPageSize) {
              setPageSize(newPageSize);
            }
          },
        }}
      />
    </div>
  );
};

export default ReceiveAgentsTable;

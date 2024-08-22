"use client";
import Database from "@/components/Database";
import Rules from "@/components/Rules";
import { Tabs } from "antd";
const { TabPane } = Tabs;
const RulesPage = () => {
  return (
    <div className="rules p-6" style={{ paddingLeft: "0px" }}>
      <Tabs defaultActiveKey="1" tabPosition="left">
        <TabPane tab="Database" key="1">
          <Database />
        </TabPane>
        <TabPane tab="YARA Rules" key="2">
          <Rules typeSource="yara" />
        </TabPane>
        <TabPane tab="Sigma Rules" key="3">
          <Rules typeSource="sigma" />
        </TabPane>
        <TabPane tab="Policy" key="4">
          <Rules typeSource="policy" />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default RulesPage;

import React from "react";
import dayjs from "dayjs";
import type { TimeRangePickerProps } from "antd";
import { DatePicker, Drawer } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Popover, Space, Button } from "antd";
import type { DrawerProps, RadioChangeEvent } from "antd";
const { RangePicker } = DatePicker;
import { Select } from "antd";
import type { SelectProps } from "antd";
// <===== data suggestion for search box ======>
const filterData = ["mac", "local_ip", ">", "<", ">=", "<=", "computer_name"];
const options: SelectProps["options"] = [];
filterData.forEach((item) => {
  options.push({
    value: item,
    label: item,
  });
});
//=============================================
const rangePresets: TimeRangePickerProps["presets"] = [
  { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
  { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
  { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
  { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
];
type FunctionBarProps = {
  setTimeRange?: React.Dispatch<React.SetStateAction<string[]>>;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  storedValue: string[];
  setStoredValue?: React.Dispatch<React.SetStateAction<string[]>>;
  placeHolder?: string;
};

const FunctionBar: React.FC<FunctionBarProps> = ({
  setTimeRange,
  setSearch, // getValue from Search bar to parent component
  storedValue,
  setStoredValue,
  placeHolder = "Search by queries",
}) => {
  const [open, setOpen] = useState(false);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onRangeChange = (values: any, dateStrings: string[]) => {
    if (values) {
      if (setTimeRange) {
        setTimeRange([values[0].toISOString(), values[1].toISOString()]);
        if (setStoredValue) {
          setStoredValue([values[0].toISOString(), values[1].toISOString()]);
        }
      }
    } else {
      console.log("Clear");
    }
  };
  return (
    <div className=" justify-start flex  rounded-sm border border-stroke bg-white py-2 px-2 shadow-default dark:border-strokedark dark:bg-boxdark">
      <Drawer
        title="Drawer with extra actions"
        placement={"left"}
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <Select
          mode="tags"
          style={{ width: "30%" }}
          placeholder={"Field"}
          onChange={handleChange}
          options={options}
        />
        <Select
          mode="tags"
          style={{ width: "30%" }}
          placeholder={"Operator"}
          onChange={handleChange}
          options={options}
        />
        <Select
          mode="tags"
          style={{ width: "30%" }}
          placeholder={"Value"}
          onChange={handleChange}
          options={options}
        />
      </Drawer>
      <div className="flex  justify-center items-center w-2/3 md:w-2/3">
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </div>
      <div className=" justify-end items-center flex w-1/3 md:w-1/3  ">
        {/* Export dashboard to PDF */}
        <Popover
          content={() => {
            return <div>Export dashboard data!</div>;
          }}
        ></Popover>
        <div className="ml-2 event-range-padding">
          <RangePicker
            presets={[
              {
                label: (
                  <span aria-label="Current Time to End of Day">Now ~ EOD</span>
                ),
                value: () => [dayjs(), dayjs().endOf("day")], // 5.8.0+ support function
              },
              ...rangePresets,
            ]}
            defaultValue={
              storedValue.length > 0
                ? [dayjs(storedValue[0]), dayjs(storedValue[1])]
                : [dayjs(), dayjs().endOf("day")]
            }
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            onChange={onRangeChange}
          />
        </div>
        <div className="ml-2">
          <Popover
            content={() => {
              return <div>Reload</div>;
            }}
          >
            <ReloadOutlined style={{ fontSize: "16px", color: "#08c" }} />
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default FunctionBar;

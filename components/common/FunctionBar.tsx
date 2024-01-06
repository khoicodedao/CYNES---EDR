import React from "react";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { Input } from "antd";
import type { TimeRangePickerProps } from "antd";
import { DatePicker } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { Popover } from "antd";
const { RangePicker } = DatePicker;
const { Search } = Input;
const onRangeChange = (
  dates: null | (Dayjs | null)[],
  dateStrings: string[]
) => {
  if (dates) {
    console.log("From: ", dates[0], ", to: ", dates[1]);
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
  } else {
    console.log("Clear");
  }
};

const rangePresets: TimeRangePickerProps["presets"] = [
  { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
  { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
  { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
  { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
];
type FunctionBarProps = {
  setTimeRange?: React.Dispatch<React.SetStateAction<any>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  placeHolder?: string;
};
const onSearch = (value: any) => console.log(value);
const FunctionBar: React.FC<FunctionBarProps> = ({
  setTimeRange,
  setSearch,
  placeHolder = "Search by queries",
}) => {
  return (
    <div className=" justify-between flex  rounded-sm border border-stroke bg-white py-2 px-2 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-center items-center w-2/3 md:w-2/3">
        <Search
          placeholder={placeHolder}
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
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
            defaultValue={[dayjs(), dayjs().endOf("day")]}
            showTime
            format="YYYY/MM/DD HH:mm:ss"
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

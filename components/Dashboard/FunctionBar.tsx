import React from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import type { TimeRangePickerProps } from "antd";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
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
const FunctionBar = () => {
  return (
    <div className=" justify-between flex  rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div>
        <p>Organization Dashboard!</p>
      </div>
      <div className=" justify-between flex ml:w-1/4 md:w-1/3">
        <Button type="primary" icon={<DownloadOutlined />}>
          Export Dashboard
        </Button>
        <div className=" ml-2">
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
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            onChange={onRangeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FunctionBar;

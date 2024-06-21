"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import dayjs from "dayjs";
import { useState } from "react";
import DataGrid from "./DataGrid";
import Upload from "./Upload";
const FileManager = () => {
  const [storedValue, setStoredValue] = useLocalStorage("local-time", [
    dayjs().toISOString(),
    dayjs().endOf("day").toISOString(),
  ]);
  const defaultTimeRange =
    storedValue.length > 0
      ? [storedValue[0], storedValue[1]]
      : [dayjs().toISOString(), dayjs().endOf("day").toISOString()];
  const [timeRange, setTimeRange] = useState<string[]>(defaultTimeRange);
  const [search, setSearch] = useState<
    { field: string; operator: string; value: string }[]
  >([]);
  return (
    <>
      <div className=" flex mt-1 rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark shadow-default">
        <div className="w-3/4">
          <DataGrid timeRange={timeRange} search={search}></DataGrid>
        </div>
        <div className="w-1/4">
          <Upload></Upload>
        </div>
      </div>
      {/* <!-- ====== DataGrid Section End ====== --> */}
    </>
  );
};

export default FileManager;

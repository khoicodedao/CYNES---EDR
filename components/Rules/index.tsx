"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import dayjs from "dayjs";
import { useState } from "react";
import DataGrid from "./DataGrid";
const FileManager = ({ typeSource }: { typeSource: string }) => {
  const [reloadGrid, setReloadGrid] = useState(false);
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
    <div className="file-page">
      <div className=" flex mt-1 rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark shadow-default">
        <div className="w-full">
          <DataGrid
            reload={reloadGrid}
            setReload={setReloadGrid}
            timeRange={timeRange}
            typeSource={typeSource}
            uploadType={typeSource}
            search={search}
          ></DataGrid>
        </div>
      </div>
    </div>
  );
};

export default FileManager;

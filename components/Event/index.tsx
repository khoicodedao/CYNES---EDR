"use client";
import FunctionBar from "@/components/common/FunctionBar";
import StatisticEvent from "./StatisticEvent";
import DataGrid from "./DataGrid";
import { useState } from "react";
const Event = () => {
  const [timeRange, setTimeRange] = useState<any>(null);
  const [search, setSearch] = useState<string>("");

  return (
    <>
      {/* <!-- ====== FunctionBar Section Start ====== --> */}
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <FunctionBar
          setTimeRange={setTimeRange}
          setSearch={setSearch}
          placeHolder="Search by query (mac='AA-DC-2F-4A-AD-F5')"
        ></FunctionBar>
      </div>
      {/* <!-- ====== FunctionBar Section End ====== --> */}

      {/* <!-- ====== StatisticEvent Section Start ====== --> */}
      <div className=" mt-1 w-full max-w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark shadow-default">
        <StatisticEvent></StatisticEvent>
      </div>

      {/* <!-- ====== Event Section End ====== --> */}
      {/* <!-- ====== DataGrid Section Start ====== --> */}

      <div className=" mt-1 w-full max-w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark shadow-default">
        <DataGrid></DataGrid>
      </div>
      {/* <!-- ====== DataGrid Section End ====== --> */}
    </>
  );
};

export default Event;

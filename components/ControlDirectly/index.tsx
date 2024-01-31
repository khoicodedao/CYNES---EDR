"use client";
import StatisticAgents from "./StatisticControl";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { useState } from "react";
const ControlDirectly = () => {
  const [terminalLineData, setTerminalLineData] = useState([
    "Welcome to the React Terminal UI Demo!",
  ]);
  return (
    <>
      {/* <!-- ====== FunctionBar Section Start ====== --> */}
      {/* <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <FunctionBar></FunctionBar>
      </div> */}
      {/* <!-- ====== FunctionBar Section End ====== --> */}

      {/* <!-- ====== StatisticEvent Section Start ====== --> */}
      <div className=" mt-1 w-full max-w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark shadow-default">
        <StatisticAgents></StatisticAgents>
      </div>

      {/* <!-- ====== Event Section End ====== --> */}
      {/* <!-- ====== DataGrid Section Start ====== --> */}

      <div className=" mt-1 w-full max-w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark shadow-default">
        <Terminal
          height="200"
          name="React Terminal Usage Example"
          colorMode={ColorMode.Dark}
          onInput={(terminalInput) => {
            console.log(`New terminal input received: '${terminalInput}'`);
            // terminalLineData.push(terminalInput);
            // setTerminalLineData([...terminalLineData]);
          }}
        >
          {terminalLineData}
        </Terminal>
      </div>
      {/* <!-- ====== DataGrid Section End ====== --> */}
    </>
  );
};

export default ControlDirectly;
// add padding in tailwind css?

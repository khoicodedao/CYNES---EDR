"use client";
import StatisticAgents from "./StatisticControl";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { useState, useEffect } from "react";
const io = require("socket.io-client/dist/socket.io");
const ControlDirectly = () => {
  const [terminalLineData, setTerminalLineData] = useState([""]);
  const socket = io("http://localhost:8000");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });
    socket.emit("message", {
      //reqire token, client (id) in header when connect
      // "from":"user1",
      to: "test",
      command_type: "CMD",
      command_info: {
        dir: "c:\\windows\\",
        cmd: "dir",
      },
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <div className=" mt-1 w-full max-w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark shadow-default">
        <StatisticAgents></StatisticAgents>
      </div>
      <div className=" mt-1 w-full max-w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark shadow-default">
        <Terminal
          height="200"
          name="Terminal"
          colorMode={ColorMode.Dark}
          onInput={(terminalInput) => {
            socket.emit("message", {
              //reqire token, client (id) in header when connect
              // "from":"user1",
              to: "test",
              command_type: terminalInput,
              command_info: {
                dir: "c:\\windows\\",
                cmd: "dir",
              },
            });
            console.log(`New terminal input received: '${terminalInput}'`);
            terminalLineData.push(`${terminalInput}\n`);
            setTerminalLineData([...terminalLineData]);
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

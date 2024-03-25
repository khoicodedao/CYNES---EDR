"use client";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { useState, useEffect } from "react";
import { Avatar, List } from "antd";
const io = require("socket.io-client/dist/socket.io");
const data = [
  {
    title: "Agent 1",
  },
  {
    title: "Agent 2",
  },
  {
    title: "Agent 3",
  },
];
const ControlDirectly = () => {
  const [terminalLineData, setTerminalLineData] = useState<any[]>([""]);

  // useEffect(() => {
  //   const socket = io("https://socket-edr.onrender.com/user");
  //   socket.on("connect", () => {
  //     console.log("Connected to Socket.IO server");
  //   });
  //   socket.emit("message", {
  //     to: "test",
  //     command_type: "CMD",
  //     command_info: {
  //       dir: "c:\\windows\\",
  //       cmd: "dir",
  //     },
  //   });
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [terminalLineData.length]);
  return (
    <>
      <div className="flex">
        <div className="w-1/4 ">
          <div
            id="scrollableDiv"
            style={{
              height: "calc(100vh - 200px)",
              overflow: "auto",
              padding: "0 16px",
              border: "1px solid rgba(140, 140, 140, 0.35)",
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                      />
                    }
                    title={<p className="dark:text-white">{item.title}</p>}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
        <div className="w-3/4 bg-gray-300 p-6 pt-0 pb-0">
          <Terminal
            height="calc(100vh - 100px)"
            name="Terminal"
            colorMode={ColorMode.Dark}
            onInput={(terminalInput) => {
              // socket.emit("message", {
              //   to: "test",
              //   command_type: terminalInput,
              //   command_info: {
              //     dir: "c:\\windows\\",
              //     cmd: "dir",
              //   },
              // });
              if (terminalInput === "clear") setTerminalLineData([""]);
              else {
                terminalLineData.push(
                  <TerminalOutput>{terminalInput}</TerminalOutput>
                );
                setTerminalLineData([...terminalLineData]);
              }
            }}
          >
            {terminalLineData}
          </Terminal>
        </div>
      </div>

      {/* <!-- ====== DataGrid Section End ====== --> */}
    </>
  );
};

export default ControlDirectly;
// add padding in tailwind css?

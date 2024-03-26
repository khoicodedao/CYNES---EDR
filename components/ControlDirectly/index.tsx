"use client";
import "./index.css";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { useState, useEffect } from "react";
import { Avatar, List, Badge } from "antd";
const io = require("socket.io-client");
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
  const [clientID, setClientID] = useState("");
  const [terminalLineData, setTerminalLineData] = useState<any[]>([""]);
  const headers = {
    autoConnect: false,
    client: "client2",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFscyI6WyJhbGw6YWxsIl0sImV4cGlyZXMiOjE3MTIzNTM1ODAsImlkIjoiMDk4YTUxMTYtNDFmYi00ZTgxLTk4MzItZTgyYjZiZDU4MjI2IiwidXNlcm5hbWUiOiJtb25pdG9yIn0.28T3TVBqHfqiWvdKZWFOkhyE5EFuHIyXUxCYYZKkONA",
  };
  const socket = io("https://socket-edr.onrender.com/user", {
    extraHeaders: headers,
  });

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("Connected to Socket.IO server");
  //   });
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
      <div id="control-page" className="flex">
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
            <h3 className="ml-2 pb-2 pt-2 opacity-70 font-bold border-b border-gray-400">
              Agent Online
            </h3>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item className="hover:bg-red-200">
                  <List.Item.Meta
                    avatar={<Badge status="success" />}
                    title={
                      <div
                        className="dark:text-white cursor-pointer "
                        onClick={() => {
                          setClientID(item.title);
                        }}
                      >
                        <div className="font-bold">ID: {item.title}</div>
                        <div className="opacity-25">
                          Time online: 2024.03.26 09:29:31
                        </div>
                      </div>
                    }
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

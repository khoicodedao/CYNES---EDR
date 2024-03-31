"use client";
import "./index.css";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { useState, useEffect } from "react";
import { List, Badge } from "antd";
import { jwtDecode } from "jwt-decode";
const io = require("socket.io-client");
const parseCookies = () => {
  return document.cookie.split(";").reduce((cookies: any, cookie) => {
    const [name, value] = cookie.split("=").map((c) => c.trim());
    cookies[name] = value;
    return cookies;
  }, {});
};
//!error don't update msg when run command
const ControlDirectly = () => {
  const cookies = parseCookies();
  let userName: {
    expires: number;
    id: string;
    username: string;
  } = jwtDecode(cookies.token);
  const [clientID, setClientID] = useState("");
  const [directory, setDirectory] = useState("");
  const [listAgent, setListAgent] = useState<
    {
      title: string;
      time: any;
      active: boolean;
    }[]
  >([]);
  const headers = {
    client: userName.username,
    token: cookies.token,
  };
  const socket = io("https://socket-edr.onrender.com/user", {
    extraHeaders: headers,
  });
  // const [active, setActive] = useState(false);
  const activeAgent = (index: number) => {
    let newListAgent = listAgent.map((item, i) => {
      if (i == index) {
        return { ...item, active: !item.active };
      } else {
        return { ...item, active: false };
      }
    });

    setListAgent(newListAgent);
  };

  const [terminalLineData, setTerminalLineData] = useState<any[]>([""]);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("list_agents", (msg: any) => {
      console.log("list_agents", msg);
      const transformedArray: {
        title: string;
        time: string | unknown;
        active: boolean;
      }[] = Object.entries(msg).map(([key, value]) => ({
        title: key,
        time: value,
        active: false,
      }));

      // Use a Set to keep track of unique titles
      const uniqueTitles = new Set();

      // Filter the merged array to include only objects with unique titles
      const resultArray = transformedArray.filter((obj) => {
        if (!uniqueTitles.has(obj.title)) {
          uniqueTitles.add(obj.title);
          return true;
        }
        return false;
      });

      setListAgent((prevList) => [...prevList, ...resultArray]);
    });

    socket.on("msg", (msg: any) => {
      console.log("msg", msg);
      // terminalLineData.push(
      //   <TerminalOutput>{`${directory} ${msg.command_info.ouput}`}</TerminalOutput>
      // );
      // setTerminalLineData([...terminalLineData]);
      // setDirectory(msg.command_info.dir);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div id="control-page" className="flex">
        <div className="w-1/4 ">
          <div
            id="scrollableDiv"
            style={{
              height: "calc(100vh - 200px)",
              overflow: "auto",
              // padding: "0 16px",
              border: "1px solid rgba(140, 140, 140, 0.35)",
            }}
          >
            <h3 className="ml-2 pb-2 pt-2 opacity-70 font-bold border-b border-gray-400">
              Agent Online
            </h3>
            <List
              itemLayout="horizontal"
              dataSource={listAgent}
              renderItem={(item, index) => (
                <List.Item
                  style={{ padding: "5px" }}
                  className={`cursor-pointer ${item.active ? "active" : ""}`}
                  onClick={() => {
                    activeAgent(index);
                  }}
                >
                  <List.Item.Meta
                    avatar={<Badge status="success" />}
                    title={
                      <div
                        className="dark:text-white cursor-pointer  "
                        onClick={() => {
                          setClientID(item.title);
                        }}
                      >
                        <div className="font-bold">ID: {item.title}</div>
                        <div className="opacity-25">{item.time}</div>
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
            prompt={`$ ${directory}`}
            height="calc(100vh - 100px)"
            name="Terminal"
            colorMode={ColorMode.Dark}
            onInput={(terminalInput) => {
              console.log("clientID", clientID);
              socket.emit("msg", {
                from: userName.username,
                to: clientID,
                command_type: "cmd",
                command_info: {
                  dir: "c:\\windows\\",
                  cmd: terminalInput,
                },
              });
              if (terminalInput === "clear") setTerminalLineData([""]);
              else {
                terminalLineData.push(
                  <TerminalOutput>{`${directory} ${terminalInput}`}</TerminalOutput>
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

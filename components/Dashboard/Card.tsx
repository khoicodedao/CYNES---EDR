"use client";
import React, { useState, useEffect } from "react";
import CardDataStats from "../CardDataStats";
import { WarningOutlined } from "@ant-design/icons";
import { customAxiosPost } from "@/helpers/custom-axios";
import Link from "next/link";
import API_URL from "@/helpers/api-url";
type CARD = {
  agents: {
    online: number;
    offline: number;
  };
  alerts: {
    hight: number;
    medium: number;
    low: number;
  };
};
const cardInit: CARD = {
  agents: {
    online: 0,
    offline: 0,
  },
  alerts: {
    hight: 0,
    medium: 0,
    low: 0,
  },
};
function formatNumberWithDots(number: number) {
  // Convert number to string
  const numStr = number.toString();
  // Check if the number is greater than 1000
  if (number > 1000) {
    // Split the string into parts before and after the decimal point
    const parts = numStr.split(".");
    // Add dots (or commas) as thousand separators to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // Join the parts back together
    return parts.join(".");
  } else {
    // Return the original number if it's not greater than 1000
    return numStr;
  }
}
function calculateRatios(number1: number, number2: number, number3?: number) {
  // Check if any of the numbers is zero
  if (number1 === 0) {
    return [0, 100];
  }
  if (number2 == 0) {
    return [100, 0];
  }
  let sum = number1 + number2;
  if (number3) {
    sum = sum + number3;
  }
  const ratio1 = (number1 / sum) * 100;
  const ratio2 = (number2 / sum) * 100;
  return [Number(ratio1.toFixed(0)), Number(ratio2.toFixed(0))];
}
type DataGridProps = {
  timeRange?: string[];
};
type AgentStatus = {
  online: number;
  offline: number;
};
type AlertLevel = {
  hight: number;
  medium: number;
  low: number;
};
const Card: React.FC<DataGridProps> = ({ timeRange }) => {
  const [card, setCard] = useState<CARD>(cardInit);
  let startDate = "";
  let filter: any = {};
  if (timeRange) {
    startDate = timeRange[0];
    const filterInTimeRage = [
      {
        field: "created_at",
        operator: ">=",
        value: timeRange[0],
      },
      {
        field: "created_at",
        operator: "<=",
        value: timeRange[1],
      },
    ];
    filter["filter"] = filterInTimeRage;
  }
  useEffect(() => {
    let urlAgent = API_URL.AGENT.COUNT_AGENTS;
    let urlAlert = API_URL.ALERTS.COUNT_ALERTS;
    let getDataAgent = async () => {
      let resData: { success: boolean; data: AgentStatus } =
        await customAxiosPost(urlAgent, startDate);
      if (resData.success) {
        setCard((prevState) => {
          return {
            ...prevState,
            agents: resData.data,
          };
        });
      }
    };
    let getDataAlert = async () => {
      let resData: { success: boolean; data: AlertLevel } =
        await customAxiosPost(urlAlert, filter);
      if (resData.success) {
        setCard((prevState) => {
          return {
            ...prevState,
            alerts: resData.data,
          };
        });
      }
    };
    getDataAlert();
    getDataAgent();
  }, [timeRange, startDate]);
  return (
    <div className="dashboard-card grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5 mt-7.5">
      <Link className="card-agent" href="/agents">
        <CardDataStats
          title="Agents"
          total={formatNumberWithDots(card.agents.online + card.agents.offline)}
          // newData="+ 1"
          detail={[
            {
              title: "Online",
              count: formatNumberWithDots(card.agents.online),
              ratio: calculateRatios(
                card.agents.online,
                card.agents.offline
              )[0],
            },
            {
              title: "Offline",
              count: formatNumberWithDots(card.agents.offline),
              ratio: calculateRatios(
                card.agents.online,
                card.agents.offline
              )[1],
            },
          ]}
          // levelUp
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="101"
            height="100"
            viewBox="0 0 101 100"
            fill="none"
          >
            <g clip-path="url(#clip0_3388_11467)">
              <path
                d="M3 11C3 6.58172 6.58172 3 11 3H91C95.4183 3 99 6.58172 99 11V91C99 95.4183 95.4183 99 91 99H11C6.58172 99 3 95.4183 3 91V11Z"
                fill="url(#paint0_linear_3388_11467)"
                fill-opacity="0.8"
              />
              <g filter="url(#filter1_b_3388_11467)">
                <path
                  d="M3 11C3 6.58172 6.58172 3 11 3H91C95.4183 3 99 6.58172 99 11V91C99 95.4183 95.4183 99 91 99H11C6.58172 99 3 95.4183 3 91V11Z"
                  fill="url(#paint1_linear_3388_11467)"
                  fill-opacity="0.6"
                />
              </g>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11 2H91C95.9706 2 100 6.02944 100 11V91C100 95.9706 95.9706 100 91 100H11C6.02944 100 2 95.9706 2 91V11C2 6.02944 6.02944 2 11 2ZM11 3C6.58172 3 3 6.58172 3 11V91C3 95.4183 6.58172 99 11 99H91C95.4183 99 99 95.4183 99 91V11C99 6.58172 95.4183 3 91 3H11Z"
                fill="url(#paint2_linear_3388_11467)"
              />
              <g filter="url(#filter2_d_3388_11467)">
                <path
                  d="M77.6666 21.667H24.3334C21.3932 21.667 19 24.059 19 27.0004V64.3337C19 67.2751 21.3932 69.6671 24.3334 69.6671H43.006C42.95 71.7944 42.5437 75.1971 41.0182 76.8039C40.4584 77.3924 39.8177 77.6671 39 77.6671C38.263 77.6671 37.6666 78.2635 37.6666 79.0005C37.6666 79.7375 38.263 80.3339 39 80.3339H63C63.737 80.3339 64.3334 79.7375 64.3334 79.0005C64.3334 78.2635 63.737 77.6671 63 77.6671C62.1823 77.6671 61.5416 77.3936 60.9844 76.8051C59.4626 75.2064 59.0537 71.7987 58.9956 69.6671H77.6668C80.6069 69.6671 83.0001 67.2752 83.0001 64.3337V27.0004C83 24.059 80.6068 21.667 77.6666 21.667ZM51 67.0081C49.526 67.0081 48.3255 65.8076 48.3255 64.3336C48.3255 62.8596 49.526 61.6591 51 61.6591C52.474 61.6591 53.6745 62.8596 53.6745 64.3336C53.6745 65.8076 52.474 67.0081 51 67.0081ZM24.3334 59.0004V27.0004H77.6668L77.669 59.0004H24.3334Z"
                  fill="url(#paint3_linear_3388_11467)"
                />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_b_3388_11467"
                x="-0.470703"
                y="-1.6377"
                width="105.471"
                height="106.638"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="3" />
                <feComposite
                  in2="SourceAlpha"
                  operator="in"
                  result="effect1_backgroundBlur_3388_11467"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_backgroundBlur_3388_11467"
                  result="shape"
                />
              </filter>
              <filter
                id="filter1_b_3388_11467"
                x="-27"
                y="-27"
                width="156"
                height="156"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="15" />
                <feComposite
                  in2="SourceAlpha"
                  operator="in"
                  result="effect1_backgroundBlur_3388_11467"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_backgroundBlur_3388_11467"
                  result="shape"
                />
              </filter>
              <filter
                id="filter2_d_3388_11467"
                x="16"
                y="18.667"
                width="72"
                height="66.667"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="1" dy="1" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.0117647 0 0 0 0 0.364706 0 0 0 0 0.745098 0 0 0 1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_3388_11467"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_3388_11467"
                  result="shape"
                />
              </filter>
              <linearGradient
                id="paint0_linear_3388_11467"
                x1="-27"
                y1="-18"
                x2="114"
                y2="108"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.635465" stop-color="#00BBFF" stop-opacity="0" />
                <stop offset="1" stop-color="#18ACFF" stop-opacity="0.8" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_3388_11467"
                x1="3"
                y1="-3.5"
                x2="96.5"
                y2="99"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#00BBFF" stop-opacity="0.19" />
                <stop offset="1" stop-color="#206DC7" stop-opacity="0.1" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_3388_11467"
                x1="120"
                y1="99"
                x2="8.5"
                y2="-10"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.005" stop-color="#B5EBFF" />
                <stop offset="0.543227" stop-color="#238AC5" />
                <stop offset="1" stop-color="#1E1F24" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_3388_11467"
                x1="49"
                y1="81.5004"
                x2="74.1542"
                y2="84.6286"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#2693F5" />
                <stop offset="1" stop-color="#19CAFF" />
              </linearGradient>
              <clipPath id="clip0_3388_11467">
                <rect width="101" height="100" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </CardDataStats>
      </Link>
      <Link className="cart-alert" href="/alerts">
        <CardDataStats
          title="Alerts"
          total={formatNumberWithDots(
            card.alerts.hight + card.alerts.low + card.alerts.medium
          )}
          // newData="2.010"
          detail={[
            {
              title: "Hight",
              count: formatNumberWithDots(card.alerts.hight),
              ratio: calculateRatios(
                card.alerts.hight,
                card.alerts.medium,
                card.alerts.low
              )[0],
            },
            {
              title: "Medium",
              count: formatNumberWithDots(card.alerts.medium),
              ratio: calculateRatios(
                card.alerts.hight,
                card.alerts.medium,
                card.alerts.low
              )[1],
            },
          ]}
          // levelDown
        >
          <WarningOutlined></WarningOutlined>
        </CardDataStats>
      </Link>
    </div>
  );
};

export default Card;

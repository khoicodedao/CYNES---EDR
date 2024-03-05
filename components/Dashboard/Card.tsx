import React from "react";
import CardDataStats from "../CardDataStats";
import { WarningOutlined } from "@ant-design/icons";
import Link from "next/link";
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
const cardInit = {
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
  if (number1 === 0 || number2 === 0) {
    return [0, 0];
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
const Card: React.FC<DataGridProps> = ({ timeRange }) => {
  let card = {
    agents: {
      online: 2314,
      offline: 400,
    },
    alerts: {
      hight: 10341,
      medium: 80023,
      low: 1251,
    },
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5 mt-7.5">
      <Link href="/agents">
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
            className="fill-primary dark:fill-white"
            width="150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            id="Layer_1"
            viewBox="0 0 32 32"
          >
            <title />
            <path d="M30,3H2A2,2,0,0,0,0,5V24a2,2,0,0,0,2,2H14v2H10v1H22V28H18V26H30a2,2,0,0,0,2-2V5A2,2,0,0,0,30,3ZM17,28H15V26h2v2Zm14-4a1,1,0,0,1-1,1H2a1,1,0,0,1-1-1V5A1,1,0,0,1,2,4H30a1,1,0,0,1,1,1V24Z" />
            <path d="M2,21H30V5H2V21ZM3,6H29V20H3V6Z" />
            <circle cx="16" cy="23" r="1" />
          </svg>
        </CardDataStats>
      </Link>
      <Link href="/alerts">
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

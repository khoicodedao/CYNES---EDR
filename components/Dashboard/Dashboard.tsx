"use client";
import FunctionBar from "@/components/common/FunctionBar";
import API_URL from "@/helpers/api-url";
import { customAxiosPost } from "@/helpers/custom-axios";
import useLocalStorage from "@/hooks/useLocalStorage";
import dayjs from "dayjs";
import React, { Suspense, useEffect, useState } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import Card from "./Card";
import FallbackChartTwo from "./FallbackChartTwo";
type Level = {
  hight: number;
  medium: number;
  low: number;
};
const DashBoard: React.FC = () => {
  const [alertLevel, setAlertLevel] = useState<Level>({
    hight: 0,
    medium: 0,
    low: 0,
  });
  const [eventLevel, setEventLevel] = useState<Level>({
    hight: 0,
    medium: 0,
    low: 0,
  });
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
  let filter: any = {};

  useEffect(() => {
    if (timeRange) {
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
    let urlEvent = API_URL.EVENTS.COUNT_EVENTS;
    let getDataEvent = async () => {
      let resData: { success: boolean; data: Level } = await customAxiosPost(
        urlEvent,
        filter
      );
      console.log(resData);
      if (resData.success) {
        setEventLevel(resData.data);
      }
    };
    //======Get Alert data
    let urlAlert = API_URL.ALERTS.COUNT_ALERTS;
    let getDataAlert = async () => {
      let resData: { success: boolean; data: Level } = await customAxiosPost(
        urlAlert,
        filter
      );
      console.log(resData);
      if (resData.success) {
        setAlertLevel(resData.data);
      }
    };
    //==========fetch data
    getDataAlert();
    getDataEvent();
  }, [timeRange]);
  return (
    <div className="dashboard">
      <FunctionBar
        setStoredValue={setStoredValue}
        storedValue={storedValue}
        setTimeRange={setTimeRange}
        setSearch={setSearch}
        search={search}
        placeHolder="Search by query (mac='AA-DC-2F-4A-AD-F5')"
      ></FunctionBar>
      <Card timeRange={timeRange}></Card>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <Suspense fallback={<FallbackChartTwo />}>
          <ChartTwo timeRange={timeRange} />
        </Suspense>
        {/* <ChartThree title="Alerts" data={Object.values(alertLevel)} />
        <ChartThree title="Events" data={Object.values(eventLevel)} /> */}
      </div>
      {/* <div className={styles.dashboard}>
        <div className={styles.content1}>
          <img className={styles.block1Icon} alt="" src="/block-1@2x.png" />
          <img
            className={styles.operationalDataAndAlerts}
            alt=""
            src="/operational-data-and-alerts.svg"
          />
          <div className={styles.agents}>
            <div className={styles.frameParent}>
              <img className={styles.frameChild} alt="" src="/frame-6.svg" />
              <div className={styles.parent}>
                <img className={styles.icon} alt="" src="/20.svg" />
                <img className={styles.agentsIcon} alt="" src="/agents.svg" />
              </div>
            </div>
            <div className={styles.barChart}>
              <div className={styles.onlineParent}>
                <img
                  className={styles.onlineIcon}
                  alt=""
                  src="/05-online.svg"
                />
                <img
                  className={styles.offlineIcon}
                  alt=""
                  src="/15-offline.svg"
                />
              </div>
              <img
                className={styles.chartBarIcon}
                alt=""
                src="/chart-bar.svg"
              />
              <div className={styles.group}>
                <img className={styles.icon1} alt="" src="/25.svg" />
                <img className={styles.icon2} alt="" src="/75.svg" />
              </div>
            </div>
          </div>
          <div className={styles.inputNoLabeldate}>
            <div className={styles.last7DaysParent}>
              <div className={styles.last7Days}>Last 7 days</div>
              <img
                className={styles.fiRrCalendarIcon}
                alt=""
                src="/firrcalendar.svg"
              />
            </div>
          </div>
          <div className={styles.rectangle21StrokeParent}>
            <img
              className={styles.rectangle21Stroke}
              alt=""
              src="/rectangle-21-stroke.svg"
            />
            <img
              className={styles.popularOperatingSystem}
              alt=""
              src="/popular-operating-system.svg"
            />
            <img
              className={styles.chartCircleIcon}
              alt=""
              src="/chartcircle.svg"
            />
            <div className={styles.list}>
              <div className={styles.listSystems03}>
                <div className={styles.window7Parent}>
                  <img
                    className={styles.window7Icon}
                    alt=""
                    src="/window-7.svg"
                  />
                  <div className={styles.window7Group}>
                    <img
                      className={styles.window7Icon1}
                      alt=""
                      src="/window-71.svg"
                    />
                    <div className={styles.vectorParent}>
                      <img
                        className={styles.frameItem}
                        alt=""
                        src="/rectangle-50.svg"
                      />
                      <img className={styles.icon3} alt="" src="/15.svg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.listSystems02}>
                <div className={styles.window7Parent}>
                  <img
                    className={styles.window7Icon}
                    alt=""
                    src="/window-8.svg"
                  />
                  <div className={styles.window8Group}>
                    <img
                      className={styles.window8Icon1}
                      alt=""
                      src="/window-81.svg"
                    />
                    <div className={styles.vectorParent}>
                      <img
                        className={styles.frameItem}
                        alt=""
                        src="/rectangle-501.svg"
                      />
                      <img className={styles.icon4} alt="" src="/19.svg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.listSystems01}>
                <div className={styles.window7Parent}>
                  <img
                    className={styles.window7Icon}
                    alt=""
                    src="/window-10.svg"
                  />
                  <div className={styles.window10Group}>
                    <img
                      className={styles.window10Icon1}
                      alt=""
                      src="/window-101.svg"
                    />
                    <div className={styles.vectorContainer}>
                      <img
                        className={styles.frameItem}
                        alt=""
                        src="/rectangle-502.svg"
                      />
                      <img className={styles.icon5} alt="" src="/65.svg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.listSystems04}>
                <div className={styles.window7Parent}>
                  <img
                    className={styles.window7Icon}
                    alt=""
                    src="/other-icon.svg"
                  />
                  <div className={styles.otherParent}>
                    <img
                      className={styles.otherIcon1}
                      alt=""
                      src="/other.svg"
                    />
                    <div className={styles.frameDiv}>
                      <img
                        className={styles.frameItem}
                        alt=""
                        src="/rectangle-503.svg"
                      />
                      <img className={styles.icon6} alt="" src="/1.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img className={styles.content1Child} alt="" src="/group-31.svg" />
          <div className={styles.alerts}>
            <img
              className={styles.alertsChild}
              alt=""
              src="/rectangle-21.svg"
            />
            <img className={styles.alertsChild} alt="" src="/mask-group.svg" />
            <div className={styles.alerts1}>
              <div className={styles.frameGroup}>
                <img className={styles.frameIcon} alt="" src="/frame-11.svg" />
                <div className={styles.parent}>
                  <img className={styles.icon7} alt="" src="/08.svg" />
                  <img className={styles.alertsIcon} alt="" src="/alerts.svg" />
                </div>
              </div>
            </div>
            <div className={styles.alerts2}>
              <div className={styles.frameContainer}>
                <img className={styles.frameIcon} alt="" src="/frame-111.svg" />
                <div className={styles.parent}>
                  <img className={styles.icon8} alt="" src="/50.svg" />
                  <img className={styles.eventsIcon} alt="" src="/events.svg" />
                </div>
              </div>
            </div>
            <img
              className={styles.line24Stroke}
              alt=""
              src="/line-24-stroke.svg"
            />
            <div className={styles.noteAlert}>
              <img
                className={styles.noteAlertChild}
                alt=""
                src="/group-7.svg"
              />
              <img className={styles.noteAlertItem} alt="" src="/group-8.svg" />
              <img
                className={styles.noteAlertInner}
                alt=""
                src="/group-9.svg"
              />
            </div>
            <div className={styles.noteAlert1}>
              <img
                className={styles.noteAlertChild1}
                alt=""
                src="/group-71.svg"
              />
              <img
                className={styles.noteAlertChild2}
                alt=""
                src="/group-81.svg"
              />
              <img
                className={styles.noteAlertChild3}
                alt=""
                src="/group-91.svg"
              />
            </div>
            <img className={styles.pieAlertIcon} alt="" src="/pie-alert.svg" />
            <img className={styles.pieIcon} alt="" src="/pie.svg" />
          </div>
        </div>
        <div className={styles.content2}>
          <img
            className={styles.content2Child}
            alt=""
            src="/rectangle-24.svg"
          />
          <img className={styles.content2Child} alt="" src="/mask-group1.svg" />
          <img className={styles.analyticsIcon} alt="" src="/analytics.svg" />
          <div className={styles.day}>
            <img className={styles.monIcon} alt="" src="/mon.svg" />
            <img className={styles.tueIcon} alt="" src="/tue.svg" />
            <img className={styles.wedIcon} alt="" src="/wed.svg" />
            <img className={styles.thuIcon} alt="" src="/thu.svg" />
            <img className={styles.friIcon} alt="" src="/fri.svg" />
            <img className={styles.satIcon} alt="" src="/sat.svg" />
            <img className={styles.sunIcon} alt="" src="/sun.svg" />
          </div>
          <div className={styles.tab}>
            <div className={styles.frameContainer}>
              <div className={styles.frameWrapper}>
                <div className={styles.frameWrapper1}>
                  <div className={styles.groupContainer}>
                    <img
                      className={styles.frameChild3}
                      alt=""
                      src="/group-10.svg"
                    />
                    <img
                      className={styles.totalAlertsIcon}
                      alt=""
                      src="/total-alerts.svg"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.frameWrapper2}>
                <div className={styles.groupContainer}>
                  <img
                    className={styles.frameChild3}
                    alt=""
                    src="/group-101.svg"
                  />
                  <img
                    className={styles.totalEventsIcon}
                    alt=""
                    src="/total-events.svg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.number}>
            <img className={styles.icon9} alt="" src="/100.svg" />
            <img className={styles.icon10} alt="" src="/90.svg" />
            <img className={styles.icon11} alt="" src="/80.svg" />
            <img className={styles.icon12} alt="" src="/70.svg" />
            <img className={styles.icon10} alt="" src="/60.svg" />
            <img className={styles.icon14} alt="" src="/501.svg" />
            <img className={styles.icon15} alt="" src="/40.svg" />
            <img className={styles.icon10} alt="" src="/30.svg" />
            <img className={styles.icon17} alt="" src="/201.svg" />
            <img className={styles.icon18} alt="" src="/10.svg" />
            <img className={styles.icon19} alt="" src="/0.svg" />
          </div>
          <div className={styles.line}>
            <img
              className={styles.line11Stroke}
              alt=""
              src="/line-11-stroke.svg"
            />
            <img
              className={styles.line11Stroke}
              alt=""
              src="/line-10-stroke.svg"
            />
            <img
              className={styles.line11Stroke}
              alt=""
              src="/line-9-stroke.svg"
            />
            <img
              className={styles.line11Stroke}
              alt=""
              src="/line-8-stroke.svg"
            />
            <img
              className={styles.line11Stroke}
              alt=""
              src="/line-7-stroke.svg"
            />
            <img
              className={styles.line11Stroke}
              alt=""
              src="/line-11-stroke.svg"
            />
            <img
              className={styles.line11Stroke}
              alt=""
              src="/line-10-stroke.svg"
            />
            <img
              className={styles.line11Stroke}
              alt=""
              src="/line-9-stroke.svg"
            />
            <img
              className={styles.line11Stroke}
              alt=""
              src="/line-8-stroke.svg"
            />
            <img
              className={styles.line11Stroke}
              alt=""
              src="/line-7-stroke.svg"
            />
            <img
              className={styles.line1Stroke}
              alt=""
              src="/line-1-stroke.svg"
            />
          </div>
          <div className={styles.line1}>
            <img
              className={styles.line16Stroke}
              alt=""
              src="/line-16-stroke.svg"
            />
            <img
              className={styles.line16Stroke}
              alt=""
              src="/line-17-stroke.svg"
            />
            <img
              className={styles.line16Stroke}
              alt=""
              src="/line-18-stroke.svg"
            />
            <img
              className={styles.line16Stroke}
              alt=""
              src="/line-16-stroke.svg"
            />
            <img
              className={styles.line16Stroke}
              alt=""
              src="/line-17-stroke.svg"
            />
            <img
              className={styles.line16Stroke}
              alt=""
              src="/line-18-stroke.svg"
            />
            <img
              className={styles.line16Stroke}
              alt=""
              src="/line-16-stroke.svg"
            />
          </div>
          <img className={styles.content2Item} alt="" src="/group-14.svg" />
          <div className={styles.line23StrokeParent}>
            <img
              className={styles.line23Stroke}
              alt=""
              src="/line-23-stroke.svg"
            />
            <img className={styles.ellipseIcon} alt="" src="/ellipse-18.svg" />
            <img
              className={styles.ellipse18Stroke}
              alt=""
              src="/ellipse-18-stroke.svg"
            />
            <div className={styles.tooltip}>
              <img
                className={styles.containerIcon}
                alt=""
                src="/container@2x.png"
              />
              <div className={styles.container1}>
                <div className={styles.text}>
                  <div className={styles.events}>29 Mar, 2023</div>
                  <div className={styles.eventsParent}>
                    <b className={styles.events}>{`50 Events `}</b>
                    <div className={styles.number1}>
                      <b className={styles.events}>0.67%</b>
                      <img
                        className={styles.fiSrArrowSmallDownIcon}
                        alt=""
                        src="/fisrarrowsmalldown@2x.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img className={styles.content2Inner} alt="" src="/group-15.svg" />
          <div className={styles.inputNoLabelselect}>
            <div className={styles.selectParent}>
              <div className={styles.last7Days}>Day</div>
              <img
                className={styles.fiRrCalendarIcon}
                alt=""
                src="/fisranglesmalldown.svg"
              />
            </div>
          </div>
        </div>
        <div className={styles.content3}>
          <img
            className={styles.content3Child}
            alt=""
            src="/rectangle-25.svg"
          />
          <img className={styles.content3Child} alt="" src="/mask-group2.svg" />
          <div className={styles.graphLines}>
            <img
              className={styles.lineStrokeIcon}
              alt=""
              src="/line-stroke.svg"
            />
            <img
              className={styles.lineStrokeIcon}
              alt=""
              src="/line-stroke.svg"
            />
            <img
              className={styles.lineStrokeIcon}
              alt=""
              src="/line-stroke.svg"
            />
            <img
              className={styles.lineStrokeIcon}
              alt=""
              src="/line-stroke.svg"
            />
            <img
              className={styles.lineStrokeIcon}
              alt=""
              src="/line-stroke1.svg"
            />
          </div>
          <img
            className={styles.bottomValueIcon}
            alt=""
            src="/bottom-value.svg"
          />
          <div className={styles.sideValue}>
            <div className={styles.parent2}>
              <img className={styles.icon20} alt="" src="/800.svg" />
              <img className={styles.icon21} alt="" src="/600.svg" />
              <img className={styles.icon22} alt="" src="/400.svg" />
              <img className={styles.icon23} alt="" src="/200.svg" />
              <img className={styles.icon19} alt="" src="/01.svg" />
            </div>
          </div>
          <div className={styles.note}>
            <div className={styles.groupDiv}>
              <img
                className={styles.groupChild1}
                alt=""
                src="/ellipse-16.svg"
              />
              <img className={styles.hightIcon} alt="" src="/hight.svg" />
            </div>
            <div className={styles.vectorParent1}>
              <img
                className={styles.groupChild1}
                alt=""
                src="/ellipse-161.svg"
              />
              <img className={styles.mediumIcon} alt="" src="/medium.svg" />
            </div>
            <div className={styles.vectorParent2}>
              <img
                className={styles.groupChild3}
                alt=""
                src="/ellipse-162.svg"
              />
              <img className={styles.lowIcon} alt="" src="/low.svg" />
            </div>
          </div>
          <img className={styles.statisticIcon} alt="" src="/statistic.svg" />
          <div className={styles.groupParent2}>
            <img className={styles.frameChild5} alt="" src="/group-24.svg" />
            <img className={styles.frameChild5} alt="" src="/group-25.svg" />
            <img className={styles.frameChild7} alt="" src="/group-26.svg" />
            <img className={styles.frameChild8} alt="" src="/group-27.svg" />
            <img className={styles.frameChild9} alt="" src="/group-28.svg" />
            <img className={styles.frameChild10} alt="" src="/group-29.svg" />
            <img className={styles.frameChild11} alt="" src="/group-30.svg" />
          </div>
        </div>
        <div className={styles.notifiParent}>
          <img className={styles.notifiIcon} alt="" src="/notifi.svg" />
          <div className={styles.account}>
            <div className={styles.fiSrUserParent}>
              <img className={styles.fiSrUserIcon} alt="" src="/fisruser.svg" />
              <img
                className={styles.frameChild12}
                alt=""
                src="/group-411.svg"
              />
              <img
                className={styles.fiRrCaretDownIcon}
                alt=""
                src="/firrcaretdown.svg"
              />
            </div>
          </div>
        </div>
        <img className={styles.dashboardIcon} alt="" src="/dashboard.svg" />
      </div> */}
    </div>
  );
};

export default DashBoard;

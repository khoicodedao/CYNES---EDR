"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./index.module.css";
import path from "path";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen  ${
        sidebarOpen ? "w-60" : "w-30"
      } flex-col overflow-y-hidden bg-black duration-300 ease-in-out dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className={styles.navigation}>
        <img className={styles.bgIcon} alt="" src="/bg@2x.png" />
        <img className={styles.logoDemoIcon} alt="" src="/logo-demo.svg" />
        <div className={styles.navigation1}>
          <div className={styles.general}>
            <div className={styles.sectionTitle}>
              <div className={styles.titleline} />
              <div className={styles.general1}>General</div>
            </div>
            <div className={styles.menuList}>
              <div className={styles.menuItemParent}>
                <Link href="/" className={styles.menuItem}>
                  <div
                    className={`p-2 ${
                      (pathname === "/" && styles.active) || ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_3534_3998)">
                        <path
                          d="M13.116 6.40247L6.99972 10.0728L0.883465 6.40247C0.750801 6.32287 0.591951 6.29923 0.44186 6.33675C0.291768 6.37428 0.16273 6.46989 0.0831316 6.60255C0.00353347 6.73521 -0.0201041 6.89406 0.0174188 7.04416C0.0549417 7.19425 0.150551 7.32329 0.283215 7.40288L6.69988 11.2529C6.79061 11.3074 6.89446 11.3362 7.0003 11.3362C7.10614 11.3362 7.20999 11.3074 7.30072 11.2529L13.7174 7.40288C13.85 7.32329 13.9457 7.19425 13.9832 7.04416C14.0207 6.89406 13.9971 6.73521 13.9175 6.60255C13.8379 6.46989 13.7088 6.37428 13.5587 6.33675C13.4086 6.29923 13.2498 6.32287 13.1171 6.40247H13.116Z"
                          fill="white"
                        />
                        <path
                          d="M13.116 9.06653L6.99971 12.7363L0.883463 9.06653C0.817775 9.02712 0.744967 9.00103 0.669196 8.98975C0.593425 8.97848 0.516176 8.98224 0.441858 9.00082C0.36754 9.0194 0.297609 9.05243 0.236059 9.09804C0.174508 9.14364 0.122543 9.20093 0.0831298 9.26661C0.0437169 9.3323 0.0176281 9.40511 0.00635305 9.48088C-0.00492197 9.55665 -0.00116242 9.6339 0.017417 9.70822C0.0549399 9.85831 0.15055 9.98735 0.283213 10.067L6.69988 13.917C6.79061 13.9715 6.89445 14.0003 7.0003 14.0003C7.10614 14.0003 7.20999 13.9715 7.30071 13.917L13.7174 10.067C13.85 9.98735 13.9457 9.85831 13.9832 9.70822C14.0207 9.55813 13.9971 9.39928 13.9175 9.26661C13.8379 9.13395 13.7088 9.03834 13.5587 9.00082C13.4086 8.96329 13.2498 8.98693 13.1171 9.06653H13.116Z"
                          fill="white"
                        />
                        <path
                          d="M6.99982 8.6177C6.68515 8.61752 6.37646 8.53183 6.10673 8.36978L0.282732 4.87503C0.196485 4.82317 0.125122 4.74988 0.0755792 4.66228C0.0260367 4.57468 0 4.47575 0 4.37511C0 4.27448 0.0260367 4.17555 0.0755792 4.08795C0.125122 4.00035 0.196485 3.92706 0.282732 3.8752L6.10673 0.380447C6.37645 0.218414 6.68517 0.132813 6.99982 0.132812C7.31446 0.132812 7.62318 0.218414 7.8929 0.380447L13.7169 3.8752C13.8031 3.92706 13.8745 4.00035 13.9241 4.08795C13.9736 4.17555 13.9996 4.27448 13.9996 4.37511C13.9996 4.47575 13.9736 4.57468 13.9241 4.66228C13.8745 4.74988 13.8031 4.82317 13.7169 4.87503L7.8929 8.36978C7.62317 8.53183 7.31448 8.61752 6.99982 8.6177V8.6177ZM1.71715 4.37511L6.70815 7.36936C6.7963 7.42209 6.8971 7.44994 6.99982 7.44994C7.10253 7.44994 7.20333 7.42209 7.29148 7.36936L12.2825 4.37511L7.29148 1.38086C7.20333 1.32813 7.10253 1.30029 6.99982 1.30029C6.8971 1.30029 6.7963 1.32813 6.70815 1.38086V1.38086L1.71715 4.37511Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3534_3998">
                          <rect width="14" height="14" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  <div className={styles.titleOfLine}>Dashboard</div>
                </Link>
                <Link href="/events" className={styles.menuItem}>
                  <div
                    className={`p-2 ${
                      (pathname === "/events" && styles.active) || ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_3539_168)">
                        <path
                          d="M11.0833 1.16667H10.5V0.583333C10.5 0.428624 10.4385 0.280251 10.3291 0.170854C10.2197 0.0614582 10.0714 0 9.91667 0C9.76196 0 9.61358 0.0614582 9.50419 0.170854C9.39479 0.280251 9.33333 0.428624 9.33333 0.583333V1.16667H4.66667V0.583333C4.66667 0.428624 4.60521 0.280251 4.49581 0.170854C4.38642 0.0614582 4.23804 0 4.08333 0C3.92862 0 3.78025 0.0614582 3.67085 0.170854C3.56146 0.280251 3.5 0.428624 3.5 0.583333V1.16667H2.91667C2.1434 1.16759 1.40208 1.47518 0.855295 2.02196C0.308514 2.56874 0.00092625 3.31007 0 4.08333L0 11.0833C0.00092625 11.8566 0.308514 12.5979 0.855295 13.1447C1.40208 13.6915 2.1434 13.9991 2.91667 14H11.0833C11.8566 13.9991 12.5979 13.6915 13.1447 13.1447C13.6915 12.5979 13.9991 11.8566 14 11.0833V4.08333C13.9991 3.31007 13.6915 2.56874 13.1447 2.02196C12.5979 1.47518 11.8566 1.16759 11.0833 1.16667V1.16667ZM1.16667 4.08333C1.16667 3.6192 1.35104 3.17409 1.67923 2.8459C2.00742 2.51771 2.45254 2.33333 2.91667 2.33333H11.0833C11.5475 2.33333 11.9926 2.51771 12.3208 2.8459C12.649 3.17409 12.8333 3.6192 12.8333 4.08333V4.66667H1.16667V4.08333ZM11.0833 12.8333H2.91667C2.45254 12.8333 2.00742 12.649 1.67923 12.3208C1.35104 11.9926 1.16667 11.5475 1.16667 11.0833V5.83333H12.8333V11.0833C12.8333 11.5475 12.649 11.9926 12.3208 12.3208C11.9926 12.649 11.5475 12.8333 11.0833 12.8333Z"
                          fill="white"
                        />
                        <path
                          d="M7 9.625C7.48325 9.625 7.875 9.23325 7.875 8.75C7.875 8.26675 7.48325 7.875 7 7.875C6.51675 7.875 6.125 8.26675 6.125 8.75C6.125 9.23325 6.51675 9.625 7 9.625Z"
                          fill="white"
                        />
                        <path
                          d="M4.08301 9.625C4.56626 9.625 4.95801 9.23325 4.95801 8.75C4.95801 8.26675 4.56626 7.875 4.08301 7.875C3.59976 7.875 3.20801 8.26675 3.20801 8.75C3.20801 9.23325 3.59976 9.625 4.08301 9.625Z"
                          fill="white"
                        />
                        <path
                          d="M9.91699 9.625C10.4002 9.625 10.792 9.23325 10.792 8.75C10.792 8.26675 10.4002 7.875 9.91699 7.875C9.43374 7.875 9.04199 8.26675 9.04199 8.75C9.04199 9.23325 9.43374 9.625 9.91699 9.625Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3539_168">
                          <rect width="14" height="14" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  <div className={styles.titleOfLine}>Events</div>
                </Link>
                <Link href="/alerts" className={styles.menuItem}>
                  <div
                    className={`p-2 ${
                      (pathname === "/alerts" && styles.active) || ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_3539_115)">
                        <path
                          d="M7.58373 1.19642V0.583333C7.58373 0.428624 7.52227 0.280251 7.41288 0.170854C7.30348 0.0614582 7.15511 0 7.0004 0C6.84569 0 6.69731 0.0614582 6.58792 0.170854C6.47852 0.280251 6.41706 0.428624 6.41706 0.583333V1.19642C5.24268 1.3017 4.12015 1.72912 3.17314 2.43158C2.22613 3.13404 1.49141 4.08427 1.04992 5.1776C0.608431 6.27092 0.477306 7.46489 0.670994 8.62797C0.864682 9.79105 1.37567 10.8781 2.14765 11.7693C1.84278 11.9202 1.58802 12.1559 1.41404 12.4482C1.24006 12.7404 1.15429 13.0768 1.16706 13.4167C1.16706 13.5714 1.22852 13.7198 1.33792 13.8291C1.44731 13.9385 1.59569 14 1.7504 14C1.90511 14 2.05348 13.9385 2.16288 13.8291C2.27227 13.7198 2.33373 13.5714 2.33373 13.4167C2.32888 13.2369 2.39343 13.0621 2.51399 12.9286C2.63455 12.7951 2.80187 12.7132 2.98123 12.6998C3.02135 12.6921 3.06049 12.68 3.0979 12.6636C4.21529 13.5302 5.58922 14.0006 7.00331 14.0006C8.41741 14.0006 9.79134 13.5302 10.9087 12.6636C10.9429 12.6793 10.9784 12.6918 11.0149 12.7009C11.1949 12.7132 11.3632 12.7945 11.4847 12.9278C11.6062 13.0612 11.6715 13.2363 11.6671 13.4167C11.6671 13.5714 11.7285 13.7198 11.8379 13.8291C11.9473 13.9385 12.0957 14 12.2504 14C12.4051 14 12.5535 13.9385 12.6629 13.8291C12.7723 13.7198 12.8337 13.5714 12.8337 13.4167C12.8465 13.0768 12.7607 12.7404 12.5868 12.4482C12.4128 12.1559 12.158 11.9202 11.8531 11.7693C12.6251 10.8781 13.1361 9.79105 13.3298 8.62797C13.5235 7.46489 13.3924 6.27092 12.9509 5.1776C12.5094 4.08427 11.7747 3.13404 10.8277 2.43158C9.88065 1.72912 8.75812 1.3017 7.58373 1.19642V1.19642ZM1.7504 7.58333C1.7504 6.54498 2.0583 5.52995 2.63518 4.66659C3.21206 3.80323 4.032 3.13033 4.99131 2.73297C5.95062 2.33561 7.00622 2.23164 8.02462 2.43421C9.04302 2.63678 9.97848 3.1368 10.7127 3.87102C11.4469 4.60525 11.9469 5.54071 12.1495 6.55911C12.3521 7.57751 12.2481 8.63311 11.8508 9.59242C11.4534 10.5517 10.7805 11.3717 9.91714 11.9485C9.05378 12.5254 8.03875 12.8333 7.0004 12.8333C5.60853 12.8316 4.27416 12.278 3.28996 11.2938C2.30576 10.3096 1.7521 8.9752 1.7504 7.58333V7.58333Z"
                          fill="white"
                        />
                        <path
                          d="M11.2083 0.00024163C11.0536 0.00024163 10.9053 0.0616998 10.7959 0.171096C10.6865 0.280492 10.625 0.428865 10.625 0.583575C10.625 0.738285 10.6865 0.886658 10.7959 0.996054C10.9053 1.10545 11.0536 1.16691 11.2083 1.16691C11.4117 1.15145 11.6162 1.17734 11.8093 1.24302C12.0025 1.30871 12.1803 1.41283 12.3321 1.5491C12.4839 1.68537 12.6065 1.85098 12.6926 2.03593C12.7787 2.22088 12.8264 2.42135 12.8329 2.62524C12.8329 2.77995 12.8944 2.92832 13.0038 3.03772C13.1132 3.14712 13.2615 3.20858 13.4162 3.20858C13.571 3.20858 13.7193 3.14712 13.8287 3.03772C13.9381 2.92832 13.9996 2.77995 13.9996 2.62524C13.9921 2.26853 13.9136 1.91689 13.7686 1.59089C13.6236 1.26489 13.415 0.971087 13.1551 0.726658C12.8952 0.482229 12.5892 0.292087 12.2549 0.167357C11.9206 0.0426276 11.5648 -0.0141856 11.2083 0.00024163V0.00024163Z"
                          fill="white"
                        />
                        <path
                          d="M1.16667 2.62524C1.17317 2.42135 1.2209 2.22088 1.30697 2.03593C1.39304 1.85098 1.51568 1.68537 1.66749 1.5491C1.8193 1.41283 1.99713 1.30871 2.19026 1.24302C2.3834 1.17734 2.58784 1.15145 2.79125 1.16691C2.94596 1.16691 3.09433 1.10545 3.20373 0.996054C3.31313 0.886658 3.37458 0.738285 3.37458 0.583575C3.37458 0.428865 3.31313 0.280492 3.20373 0.171096C3.09433 0.0616998 2.94596 0.00024163 2.79125 0.00024163C2.43475 -0.0141856 2.07896 0.0426276 1.74468 0.167357C1.4104 0.292087 1.10436 0.482229 0.844449 0.726658C0.584539 0.971087 0.375985 1.26489 0.230989 1.59089C0.0859922 1.91689 0.00746447 2.26853 0 2.62524C0 2.77995 0.0614582 2.92832 0.170854 3.03772C0.280251 3.14712 0.428624 3.20858 0.583333 3.20858C0.738043 3.20858 0.886416 3.14712 0.995812 3.03772C1.10521 2.92832 1.16667 2.77995 1.16667 2.62524Z"
                          fill="white"
                        />
                        <path
                          d="M7.58366 6.7585V4.08333C7.58366 3.92862 7.5222 3.78025 7.4128 3.67085C7.30341 3.56146 7.15503 3.5 7.00033 3.5C6.84562 3.5 6.69724 3.56146 6.58785 3.67085C6.47845 3.78025 6.41699 3.92862 6.41699 4.08333V7C6.41703 7.1547 6.47851 7.30305 6.58791 7.41242L8.33791 9.16242C8.44793 9.26868 8.59528 9.32747 8.74823 9.32614C8.90117 9.32481 9.04748 9.26347 9.15564 9.15531C9.26379 9.04716 9.32514 8.90085 9.32647 8.7479C9.3278 8.59495 9.269 8.4476 9.16274 8.33758L7.58366 6.7585Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3539_115">
                          <rect width="14" height="14" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  <div className={styles.titleOfLine}>Alerts</div>
                </Link>
                <Link href="/agents" className={styles.menuItem}>
                  <div
                    className={`p-2 ${
                      (pathname === "/agents" && styles.active) || ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_3539_228)">
                        <path
                          d="M11.0833 0.583008H2.91667C2.1434 0.583934 1.40208 0.891522 0.855295 1.4383C0.308514 1.98508 0.00092625 2.72641 0 3.49967L0 8.16634C0.00092625 8.93961 0.308514 9.68093 0.855295 10.2277C1.40208 10.7745 2.1434 11.0821 2.91667 11.083H6.41667V12.2497H4.08333C3.92862 12.2497 3.78025 12.3111 3.67085 12.4205C3.56146 12.5299 3.5 12.6783 3.5 12.833C3.5 12.9877 3.56146 13.1361 3.67085 13.2455C3.78025 13.3549 3.92862 13.4163 4.08333 13.4163H9.91667C10.0714 13.4163 10.2197 13.3549 10.3291 13.2455C10.4385 13.1361 10.5 12.9877 10.5 12.833C10.5 12.6783 10.4385 12.5299 10.3291 12.4205C10.2197 12.3111 10.0714 12.2497 9.91667 12.2497H7.58333V11.083H11.0833C11.8566 11.0821 12.5979 10.7745 13.1447 10.2277C13.6915 9.68093 13.9991 8.93961 14 8.16634V3.49967C13.9991 2.72641 13.6915 1.98508 13.1447 1.4383C12.5979 0.891522 11.8566 0.583934 11.0833 0.583008ZM2.91667 1.74967H11.0833C11.5475 1.74967 11.9926 1.93405 12.3208 2.26224C12.649 2.59043 12.8333 3.03555 12.8333 3.49967V7.58301H1.16667V3.49967C1.16667 3.03555 1.35104 2.59043 1.67923 2.26224C2.00742 1.93405 2.45254 1.74967 2.91667 1.74967ZM11.0833 9.91634H2.91667C2.55601 9.91485 2.20463 9.80196 1.91059 9.59312C1.61655 9.38429 1.39422 9.0897 1.274 8.74967H12.726C12.6058 9.0897 12.3834 9.38429 12.0894 9.59312C11.7954 9.80196 11.444 9.91485 11.0833 9.91634Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3539_228">
                          <rect width="14" height="14" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  <div className={styles.titleOfLine}>Agents</div>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.action}>
            <div className={styles.sectionTitle}>
              <div className={styles.titleline} />
              <div className={styles.general1}>Action</div>
            </div>
            <div className={styles.menuList}>
              <div className={styles.menuItemParent}>
                <Link href="/tasks" className={styles.menuItem}>
                  <div
                    className={`p-2 ${
                      (pathname === "/tasks" && styles.active) || ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_3549_233)">
                        <path
                          d="M10.916 6.99964H8.16672C7.8573 6.99964 7.56055 6.87672 7.34176 6.65793C7.12297 6.43914 7.00005 6.14239 7.00005 5.83297V3.07614C7.00084 2.8078 6.93991 2.54286 6.82197 2.30183C6.70404 2.06079 6.53224 1.8501 6.31988 1.68606C6.11865 1.5267 5.88349 1.41572 5.63254 1.36171C5.3816 1.3077 5.1216 1.3121 4.87263 1.37456C3.45843 1.72561 2.20641 2.54884 1.32362 3.7081C0.440823 4.86736 -0.0198576 6.29321 0.0177589 7.74984C0.0553754 9.20648 0.589036 10.6067 1.53049 11.7188C2.47194 12.831 3.76478 13.5885 5.19522 13.8661C6.80353 14.1739 8.46868 13.8552 9.84966 12.9753C11.2306 12.0953 12.223 10.7207 12.6234 9.13289C12.6861 8.8836 12.6906 8.62323 12.6367 8.37189C12.5828 8.12055 12.4719 7.88496 12.3125 7.68331C12.1465 7.47124 11.9346 7.29955 11.6927 7.18114C11.4508 7.06272 11.1853 7.00067 10.916 6.99964ZM11.4923 8.84764C11.2689 9.74706 10.8107 10.571 10.1644 11.2352C9.51817 11.8994 8.70707 12.3801 7.8141 12.628C6.92114 12.8759 5.97835 12.8821 5.08217 12.6461C4.18599 12.4101 3.36858 11.9403 2.71354 11.2847C2.05851 10.6291 1.58937 9.81133 1.35409 8.91496C1.11882 8.01858 1.12586 7.0758 1.3745 6.18304C1.62313 5.29027 2.10444 4.47957 2.76919 3.83386C3.43394 3.18814 4.25828 2.73058 5.15788 2.50797C5.23484 2.48874 5.31524 2.4878 5.39263 2.50523C5.47002 2.52265 5.54225 2.55795 5.60355 2.60831C5.67594 2.66349 5.73464 2.73461 5.7751 2.81615C5.81557 2.89769 5.83671 2.98745 5.83688 3.07847V5.83297C5.83688 6.45181 6.08271 7.0453 6.5203 7.48289C6.95788 7.92047 7.55138 8.16631 8.17022 8.16631H10.9189C11.0107 8.16668 11.1012 8.18787 11.1837 8.22829C11.2661 8.2687 11.3383 8.32729 11.3949 8.39964C11.4445 8.46179 11.479 8.53457 11.4958 8.61229C11.5126 8.69001 11.5112 8.77055 11.4917 8.84764H11.4923Z"
                          fill="white"
                        />
                        <path
                          d="M13.7964 4.34336C13.5278 3.35605 13.0061 2.45598 12.2829 1.73223C11.5596 1.00847 10.6599 0.486119 9.67282 0.216857C9.56933 0.189038 9.46264 0.174917 9.35548 0.174857C9.20135 0.173393 9.04844 0.202489 8.90562 0.260463C8.76279 0.318438 8.63286 0.404142 8.52335 0.512623C8.41384 0.621104 8.32691 0.750211 8.26759 0.892485C8.20827 1.03476 8.17773 1.18738 8.17773 1.34152V4.08319C8.17773 4.54732 8.36211 4.99244 8.6903 5.32063C9.01849 5.64882 9.4636 5.83319 9.92773 5.83319H12.6805C12.8605 5.83146 13.0378 5.78824 13.1984 5.70689C13.3591 5.62554 13.4988 5.50824 13.6067 5.36412C13.7147 5.22001 13.7879 5.05294 13.8208 4.8759C13.8537 4.69887 13.8454 4.51664 13.7964 4.34336V4.34336ZM12.3392 4.66652H9.9254C9.77069 4.66652 9.62232 4.60507 9.51292 4.49567C9.40353 4.38627 9.34207 4.2379 9.34207 4.08319L9.3374 1.34561C9.34167 1.34252 9.34673 1.3407 9.35198 1.34036H9.36715C10.1617 1.55682 10.8856 1.97789 11.4666 2.56153C12.0476 3.14518 12.4653 3.87099 12.6782 4.66652H12.3392Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3549_233">
                          <rect width="14" height="14" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  <div className={styles.titleOfLine}>Tasks</div>
                </Link>
                <Link href="/list-command" className={styles.menuItem}>
                  <div
                    className={`p-2 ${
                      (pathname === "/list-command" && styles.active) || ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_3549_5)">
                        <path
                          d="M4.08333 3.50065H13.4167C13.5714 3.50065 13.7197 3.43919 13.8291 3.32979C13.9385 3.2204 14 3.07203 14 2.91732C14 2.76261 13.9385 2.61423 13.8291 2.50484C13.7197 2.39544 13.5714 2.33398 13.4167 2.33398H4.08333C3.92862 2.33398 3.78025 2.39544 3.67085 2.50484C3.56146 2.61423 3.5 2.76261 3.5 2.91732C3.5 3.07203 3.56146 3.2204 3.67085 3.32979C3.78025 3.43919 3.92862 3.50065 4.08333 3.50065Z"
                          fill="white"
                        />
                        <path
                          d="M13.4167 6.41602H4.08333C3.92862 6.41602 3.78025 6.47747 3.67085 6.58687C3.56146 6.69627 3.5 6.84464 3.5 6.99935C3.5 7.15406 3.56146 7.30244 3.67085 7.41183C3.78025 7.52123 3.92862 7.58269 4.08333 7.58269H13.4167C13.5714 7.58269 13.7197 7.52123 13.8291 7.41183C13.9385 7.30244 14 7.15406 14 6.99935C14 6.84464 13.9385 6.69627 13.8291 6.58687C13.7197 6.47747 13.5714 6.41602 13.4167 6.41602Z"
                          fill="white"
                        />
                        <path
                          d="M13.4167 10.5H4.08333C3.92862 10.5 3.78025 10.5615 3.67085 10.6709C3.56146 10.7803 3.5 10.9286 3.5 11.0833C3.5 11.238 3.56146 11.3864 3.67085 11.4958C3.78025 11.6052 3.92862 11.6667 4.08333 11.6667H13.4167C13.5714 11.6667 13.7197 11.6052 13.8291 11.4958C13.9385 11.3864 14 11.238 14 11.0833C14 10.9286 13.9385 10.7803 13.8291 10.6709C13.7197 10.5615 13.5714 10.5 13.4167 10.5Z"
                          fill="white"
                        />
                        <path
                          d="M1.16667 4.08333C1.811 4.08333 2.33333 3.561 2.33333 2.91666C2.33333 2.27233 1.811 1.75 1.16667 1.75C0.522334 1.75 0 2.27233 0 2.91666C0 3.561 0.522334 4.08333 1.16667 4.08333Z"
                          fill="white"
                        />
                        <path
                          d="M1.16667 8.16731C1.811 8.16731 2.33333 7.64498 2.33333 7.00065C2.33333 6.35632 1.811 5.83398 1.16667 5.83398C0.522334 5.83398 0 6.35632 0 7.00065C0 7.64498 0.522334 8.16731 1.16667 8.16731Z"
                          fill="white"
                        />
                        <path
                          d="M1.16667 12.2493C1.811 12.2493 2.33333 11.727 2.33333 11.0827C2.33333 10.4383 1.811 9.91602 1.16667 9.91602C0.522334 9.91602 0 10.4383 0 11.0827C0 11.727 0.522334 12.2493 1.16667 12.2493Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3549_5">
                          <rect width="14" height="14" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  <div className={styles.titleOfLine}>List Command</div>
                </Link>
                <Link href="/control-directly" className={styles.menuItem}>
                  <div
                    className={`p-2 ${
                      (pathname === "/control-directly" && styles.active) || ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_3549_157)">
                        <path
                          d="M0.583333 2.77098H2.17933C2.30454 3.23166 2.57785 3.63834 2.95711 3.92828C3.33636 4.21822 3.80049 4.3753 4.27787 4.3753C4.75526 4.3753 5.21939 4.21822 5.59864 3.92828C5.9779 3.63834 6.25121 3.23166 6.37642 2.77098H13.4167C13.5714 2.77098 13.7197 2.70953 13.8291 2.60013C13.9385 2.49073 14 2.34236 14 2.18765C14 2.03294 13.9385 1.88457 13.8291 1.77517C13.7197 1.66578 13.5714 1.60432 13.4167 1.60432H6.37642C6.25121 1.14364 5.9779 0.736963 5.59864 0.447025C5.21939 0.157087 4.75526 0 4.27787 0C3.80049 0 3.33636 0.157087 2.95711 0.447025C2.57785 0.736963 2.30454 1.14364 2.17933 1.60432H0.583333C0.428624 1.60432 0.280251 1.66578 0.170854 1.77517C0.0614582 1.88457 0 2.03294 0 2.18765C0 2.34236 0.0614582 2.49073 0.170854 2.60013C0.280251 2.70953 0.428624 2.77098 0.583333 2.77098V2.77098ZM4.27758 1.16682C4.47949 1.16682 4.67685 1.22669 4.84473 1.33886C5.0126 1.45103 5.14345 1.61046 5.22071 1.797C5.29797 1.98353 5.31819 2.18878 5.2788 2.38681C5.23941 2.58483 5.14219 2.76672 4.99942 2.90949C4.85666 3.05226 4.67476 3.14948 4.47674 3.18887C4.27872 3.22826 4.07346 3.20804 3.88693 3.13078C3.70039 3.05351 3.54096 2.92267 3.42879 2.7548C3.31662 2.58692 3.25675 2.38955 3.25675 2.18765C3.25706 1.917 3.36471 1.65753 3.55609 1.46615C3.74746 1.27478 4.00694 1.16713 4.27758 1.16682V1.16682Z"
                          fill="white"
                        />
                        <path
                          d="M13.4167 6.41641H11.8207C11.6957 5.95562 11.4225 5.5488 11.0432 5.25874C10.664 4.96868 10.1999 4.81152 9.72242 4.81152C9.24498 4.81152 8.78082 4.96868 8.40159 5.25874C8.02237 5.5488 7.74916 5.95562 7.62417 6.41641H0.583333C0.428624 6.41641 0.280251 6.47787 0.170854 6.58726C0.0614582 6.69666 0 6.84503 0 6.99974C0 7.15445 0.0614582 7.30282 0.170854 7.41222C0.280251 7.52161 0.428624 7.58307 0.583333 7.58307H7.62417C7.74916 8.04385 8.02237 8.45068 8.40159 8.74074C8.78082 9.03079 9.24498 9.18796 9.72242 9.18796C10.1999 9.18796 10.664 9.03079 11.0432 8.74074C11.4225 8.45068 11.6957 8.04385 11.8207 7.58307H13.4167C13.5714 7.58307 13.7197 7.52161 13.8291 7.41222C13.9385 7.30282 14 7.15445 14 6.99974C14 6.84503 13.9385 6.69666 13.8291 6.58726C13.7197 6.47787 13.5714 6.41641 13.4167 6.41641ZM9.72242 8.02057C9.52051 8.02057 9.32315 7.9607 9.15527 7.84853C8.9874 7.73636 8.85655 7.57693 8.77929 7.39039C8.70202 7.20386 8.68181 6.99861 8.7212 6.80059C8.76059 6.60256 8.85781 6.42067 9.00058 6.2779C9.14334 6.13514 9.32524 6.03791 9.52326 5.99852C9.72128 5.95913 9.92654 5.97935 10.1131 6.05661C10.2996 6.13388 10.459 6.26472 10.5712 6.4326C10.6834 6.60047 10.7432 6.79784 10.7432 6.99974C10.7429 7.27039 10.6353 7.52986 10.4439 7.72124C10.2525 7.91261 9.99306 8.02026 9.72242 8.02057V8.02057Z"
                          fill="white"
                        />
                        <path
                          d="M13.4167 11.2293H6.37642C6.25121 10.7686 5.9779 10.362 5.59864 10.072C5.21939 9.78209 4.75526 9.625 4.27787 9.625C3.80049 9.625 3.33636 9.78209 2.95711 10.072C2.57785 10.362 2.30454 10.7686 2.17933 11.2293H0.583333C0.428624 11.2293 0.280251 11.2908 0.170854 11.4002C0.0614582 11.5096 0 11.6579 0 11.8126C0 11.9674 0.0614582 12.1157 0.170854 12.2251C0.280251 12.3345 0.428624 12.396 0.583333 12.396H2.17933C2.30454 12.8566 2.57785 13.2633 2.95711 13.5533C3.33636 13.8432 3.80049 14.0003 4.27787 14.0003C4.75526 14.0003 5.21939 13.8432 5.59864 13.5533C5.9779 13.2633 6.25121 12.8566 6.37642 12.396H13.4167C13.5714 12.396 13.7197 12.3345 13.8291 12.2251C13.9385 12.1157 14 11.9674 14 11.8126C14 11.6579 13.9385 11.5096 13.8291 11.4002C13.7197 11.2908 13.5714 11.2293 13.4167 11.2293ZM4.27758 12.8335C4.07568 12.8335 3.87831 12.7736 3.71044 12.6614C3.54256 12.5493 3.41172 12.3898 3.33446 12.2033C3.25719 12.0168 3.23698 11.8115 3.27636 11.6135C3.31575 11.4155 3.41298 11.2336 3.55574 11.0908C3.69851 10.948 3.88041 10.8508 4.07843 10.8114C4.27645 10.772 4.48171 10.7923 4.66824 10.8695C4.85477 10.9468 5.0142 11.0776 5.12637 11.2455C5.23855 11.4134 5.29842 11.6107 5.29842 11.8126C5.29795 12.0832 5.19025 12.3426 4.99891 12.534C4.80757 12.7253 4.54818 12.833 4.27758 12.8335V12.8335Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3549_157">
                          <rect width="14" height="14" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  <div className={styles.titleOfLine}>Control Directly</div>
                </Link>
                <Link href="/group" className={styles.menuItem}>
                  <div
                    className={`p-2 ${
                      (pathname === "/group" && styles.active) || ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_3549_239)">
                        <path
                          d="M11.0833 1.75065H7.27533C7.18512 1.75125 7.09595 1.7313 7.01458 1.69232L5.17358 0.768318C4.93056 0.647302 4.66282 0.58421 4.39133 0.583984H2.91667C2.1434 0.584911 1.40208 0.892499 0.855295 1.43928C0.308514 1.98606 0.00092625 2.72739 0 3.50065L0 10.5007C0.00092625 11.2739 0.308514 12.0152 0.855295 12.562C1.40208 13.1088 2.1434 13.4164 2.91667 13.4173H11.0833C11.8566 13.4164 12.5979 13.1088 13.1447 12.562C13.6915 12.0152 13.9991 11.2739 14 10.5007V4.66732C13.9991 3.89405 13.6915 3.15273 13.1447 2.60595C12.5979 2.05917 11.8566 1.75158 11.0833 1.75065V1.75065ZM2.91667 1.75065H4.39133C4.48155 1.75006 4.57072 1.77 4.65208 1.80898L6.49308 2.73007C6.73586 2.85209 7.00362 2.91619 7.27533 2.91732H11.0833C11.4322 2.91789 11.7729 3.02271 12.0618 3.21832C12.3506 3.41394 12.5744 3.69142 12.7044 4.01515L1.16667 4.08048V3.50065C1.16667 3.03652 1.35104 2.5914 1.67923 2.26321C2.00742 1.93503 2.45254 1.75065 2.91667 1.75065V1.75065ZM11.0833 12.2507H2.91667C2.45254 12.2507 2.00742 12.0663 1.67923 11.7381C1.35104 11.4099 1.16667 10.9648 1.16667 10.5007V5.24715L12.8333 5.18123V10.5007C12.8333 10.9648 12.649 11.4099 12.3208 11.7381C11.9926 12.0663 11.5475 12.2507 11.0833 12.2507Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3549_239">
                          <rect width="14" height="14" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  <div className={styles.titleOfLine}>Group</div>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.config}>
            <div className={styles.sectionTitle}>
              <div className={styles.titleline} />
              <div className={styles.general1}>Config</div>
            </div>
            <div className={styles.menuList}>
              <div className={styles.menuItemParent}>
                <Link href="/users" className={styles.menuItem}>
                  <div
                    className={`p-2 ${
                      (pathname === "/users" && styles.active) || ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_3549_239)">
                        <path
                          d="M11.0833 1.75065H7.27533C7.18512 1.75125 7.09595 1.7313 7.01458 1.69232L5.17358 0.768318C4.93056 0.647302 4.66282 0.58421 4.39133 0.583984H2.91667C2.1434 0.584911 1.40208 0.892499 0.855295 1.43928C0.308514 1.98606 0.00092625 2.72739 0 3.50065L0 10.5007C0.00092625 11.2739 0.308514 12.0152 0.855295 12.562C1.40208 13.1088 2.1434 13.4164 2.91667 13.4173H11.0833C11.8566 13.4164 12.5979 13.1088 13.1447 12.562C13.6915 12.0152 13.9991 11.2739 14 10.5007V4.66732C13.9991 3.89405 13.6915 3.15273 13.1447 2.60595C12.5979 2.05917 11.8566 1.75158 11.0833 1.75065V1.75065ZM2.91667 1.75065H4.39133C4.48155 1.75006 4.57072 1.77 4.65208 1.80898L6.49308 2.73007C6.73586 2.85209 7.00362 2.91619 7.27533 2.91732H11.0833C11.4322 2.91789 11.7729 3.02271 12.0618 3.21832C12.3506 3.41394 12.5744 3.69142 12.7044 4.01515L1.16667 4.08048V3.50065C1.16667 3.03652 1.35104 2.5914 1.67923 2.26321C2.00742 1.93503 2.45254 1.75065 2.91667 1.75065V1.75065ZM11.0833 12.2507H2.91667C2.45254 12.2507 2.00742 12.0663 1.67923 11.7381C1.35104 11.4099 1.16667 10.9648 1.16667 10.5007V5.24715L12.8333 5.18123V10.5007C12.8333 10.9648 12.649 11.4099 12.3208 11.7381C11.9926 12.0663 11.5475 12.2507 11.0833 12.2507Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3549_239">
                          <rect width="14" height="14" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  <div className={styles.titleOfLine}>User</div>
                </Link>
                <Link href="/database" className={styles.menuItem}>
                  <div
                    className={`p-2 ${
                      (pathname === "/database" && styles.active) || ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_3549_252)">
                        <path
                          d="M14.0005 6.70836C13.9991 6.31507 13.9089 5.92718 13.7366 5.57365C13.5642 5.22012 13.3143 4.91008 13.0054 4.66669C13.4328 4.32977 13.7443 3.86784 13.8966 3.34535C14.0489 2.82285 14.0343 2.26586 13.8549 1.75206C13.6754 1.23826 13.3401 0.793282 12.8956 0.479204C12.4512 0.165126 11.9197 -0.00238988 11.3755 2.57629e-05H2.62552C2.08129 -0.00238988 1.54988 0.165126 1.10542 0.479204C0.66096 0.793282 0.325618 1.23826 0.146173 1.75206C-0.0332712 2.26586 -0.0478675 2.82285 0.10442 3.34535C0.256708 3.86784 0.568285 4.32977 0.995686 4.66669C0.68567 4.90911 0.434931 5.21894 0.262487 5.57269C0.090042 5.92644 0.000420927 6.31482 0.000420927 6.70836C0.000420927 7.1019 0.090042 7.49028 0.262487 7.84403C0.434931 8.19778 0.68567 8.50761 0.995686 8.75003C0.568285 9.08695 0.256708 9.54888 0.10442 10.0714C-0.0478675 10.5939 -0.0332712 11.1509 0.146173 11.6647C0.325618 12.1785 0.66096 12.6234 1.10542 12.9375C1.54988 13.2516 2.08129 13.4191 2.62552 13.4167H11.3755C11.9197 13.4191 12.4512 13.2516 12.8956 12.9375C13.3401 12.6234 13.6754 12.1785 13.8549 11.6647C14.0343 11.1509 14.0489 10.5939 13.8966 10.0714C13.7443 9.54888 13.4328 9.08695 13.0054 8.75003C13.3143 8.50664 13.5642 8.1966 13.7366 7.84307C13.9089 7.48954 13.9991 7.10165 14.0005 6.70836ZM1.16719 2.62503C1.16719 2.23825 1.32083 1.86732 1.59432 1.59383C1.86781 1.32034 2.23875 1.16669 2.62552 1.16669H2.91719V1.75003C2.91719 1.90474 2.97864 2.05311 3.08804 2.1625C3.19744 2.2719 3.34581 2.33336 3.50052 2.33336C3.65523 2.33336 3.8036 2.2719 3.913 2.1625C4.02239 2.05311 4.08385 1.90474 4.08385 1.75003V1.16669H5.25052V1.75003C5.25052 1.90474 5.31198 2.05311 5.42137 2.1625C5.53077 2.2719 5.67914 2.33336 5.83385 2.33336C5.98856 2.33336 6.13694 2.2719 6.24633 2.1625C6.35573 2.05311 6.41719 1.90474 6.41719 1.75003V1.16669H11.3755C11.7623 1.16669 12.1332 1.32034 12.4067 1.59383C12.6802 1.86732 12.8339 2.23825 12.8339 2.62503C12.8339 3.0118 12.6802 3.38273 12.4067 3.65622C12.1332 3.92971 11.7623 4.08336 11.3755 4.08336H2.62552C2.23875 4.08336 1.86781 3.92971 1.59432 3.65622C1.32083 3.38273 1.16719 3.0118 1.16719 2.62503V2.62503ZM12.8339 10.7917C12.8339 11.1785 12.6802 11.5494 12.4067 11.8229C12.1332 12.0964 11.7623 12.25 11.3755 12.25H2.62552C2.23875 12.25 1.86781 12.0964 1.59432 11.8229C1.32083 11.5494 1.16719 11.1785 1.16719 10.7917C1.16719 10.4049 1.32083 10.034 1.59432 9.7605C1.86781 9.487 2.23875 9.33336 2.62552 9.33336H2.91719V9.91669C2.91719 10.0714 2.97864 10.2198 3.08804 10.3292C3.19744 10.4386 3.34581 10.5 3.50052 10.5C3.65523 10.5 3.8036 10.4386 3.913 10.3292C4.02239 10.2198 4.08385 10.0714 4.08385 9.91669V9.33336H5.25052V9.91669C5.25052 10.0714 5.31198 10.2198 5.42137 10.3292C5.53077 10.4386 5.67914 10.5 5.83385 10.5C5.98856 10.5 6.13694 10.4386 6.24633 10.3292C6.35573 10.2198 6.41719 10.0714 6.41719 9.91669V9.33336H11.3755C11.7623 9.33336 12.1332 9.487 12.4067 9.7605C12.6802 10.034 12.8339 10.4049 12.8339 10.7917ZM2.62552 8.16669C2.23875 8.16669 1.86781 8.01305 1.59432 7.73956C1.32083 7.46607 1.16719 7.09513 1.16719 6.70836C1.16719 6.32159 1.32083 5.95065 1.59432 5.67716C1.86781 5.40367 2.23875 5.25003 2.62552 5.25003H2.91719V5.83336C2.91719 5.98807 2.97864 6.13644 3.08804 6.24584C3.19744 6.35523 3.34581 6.41669 3.50052 6.41669C3.65523 6.41669 3.8036 6.35523 3.913 6.24584C4.02239 6.13644 4.08385 5.98807 4.08385 5.83336V5.25003H5.25052V5.83336C5.25052 5.98807 5.31198 6.13644 5.42137 6.24584C5.53077 6.35523 5.67914 6.41669 5.83385 6.41669C5.98856 6.41669 6.13694 6.35523 6.24633 6.24584C6.35573 6.13644 6.41719 5.98807 6.41719 5.83336V5.25003H11.3755C11.7623 5.25003 12.1332 5.40367 12.4067 5.67716C12.6802 5.95065 12.8339 6.32159 12.8339 6.70836C12.8339 7.09513 12.6802 7.46607 12.4067 7.73956C12.1332 8.01305 11.7623 8.16669 11.3755 8.16669H2.62552Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3549_252">
                          <rect width="14" height="14" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  <div className={styles.titleOfLine}>Database</div>
                </Link>
              </div>
            </div>
          </div>
          <img
            className={styles.divideNavStrokeIcon}
            alt=""
            src="/dividenav-stroke.svg"
          />
          <img
            className={styles.divideNavStrokeIcon1}
            alt=""
            src="/dividenav-stroke.svg"
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

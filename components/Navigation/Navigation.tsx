"use client";
import { Dispatch, useEffect, useState, SetStateAction } from "react";
import React from "react";
import Link from "next/link";
import Dropdown from "@/helpers/svg/dropdown";
import Image from "next/image";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import { signOut, signIn } from "next-auth/react";
const CurrentDateNoSSR = dynamic(() => import("./CurrentDate"), { ssr: false });

function Navigation({
  setSidebarOpen,
  sidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: session } = useSession();
  const sessionUser = session?.user;

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const ModalLogoutHandler = () => {
    setLogoutModalOpen(!logoutModalOpen);
  };

  const LogoutHandler = () => {
    setLogoutModalOpen(!logoutModalOpen);
    signOut();
  };

  const OpenSidebarHandler = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {sessionUser && (
        <div className="fixed w-full z-10">
          <div className="bg-midnight-blue e px-6 py-2 hidden sm:block">
            <div className="max-w-[1700px] mx-auto flex">
              <div className="flex-1">
                <h4 className="text-shady-white text-base">
                  California, 24048
                </h4>
              </div>
              <div>
                <h4 className="text-shady-white text-base">
                  123-453-5039 | exampleuser@gmail.com
                </h4>
              </div>
            </div>
          </div>
          <div className="bg-dark-blue flex items-center justify-center px-6 py-6 sm:py-2 shadow-md">
            <div className="flex items-center max-w-[1700px] w-full mx-auto">
              <div className="flex-1 lg:hidden ms-3 sm:ms-5 sm:mr-10">
                <FontAwesomeIcon
                  icon={sidebarOpen ? faBarsStaggered : faBars}
                  className="h-6 w-6 hover:cursor-pointer transition-all text-shady-white bg-gunmetal p-3 rounded-sm hover:bg-aquamarine"
                  onClick={OpenSidebarHandler}
                />
              </div>
              <div className="hidden sm:block flex-1">
                <Link href="/" className="flex">
                  <Image
                    className="my-1"
                    src="/img/company-logo.png"
                    width="90"
                    height="78"
                    alt="Company-Logo"
                  />
                </Link>
              </div>
              <div className="gap-y-10 gap-x-5 2xl:gap-x-10">
                <div className="relative">
                  <button
                    onClick={ModalLogoutHandler}
                    className={`font-medium text-md transition-all text-shady-white hover:text-tangerine flex items-center`}
                  >
                    <div className="flex items-center">
                      <div className="block mr-3">
                        <p className="text-tangerine mb-0.5">
                          {sessionUser?.email}
                        </p>
                        <CurrentDateNoSSR />
                      </div>
                      <div>
                        <span>
                          <Dropdown />
                        </span>
                      </div>
                    </div>
                  </button>
                  {logoutModalOpen && (
                    <button
                      onClick={LogoutHandler}
                      className="absolute transition-all top-14 bg-steel-blue right-0 px-5 py-2 rounded-sm text-shady-white hover:bg-teal-600"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navigation;

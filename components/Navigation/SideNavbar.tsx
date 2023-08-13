"use client";
import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faBuilding,
  faCommentDots,
  faCircleQuestion,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

function SideNavbar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: session, status } = useSession();
  const sessionUser = session?.user;
  console.log(sessionUser);

  const params = usePathname();

  const Navigation = [
    {
      name: "How Can We Help You",
      link: "/",
      icon: faLayerGroup,
    },
    {
      name: "About Us",
      link: "/AboutUs",
      icon: faBuilding,
    },
    {
      name: "Client Testimony",
      link: "/ClientTestimony",
      icon: faCommentDots,
    },
    {
      name: "FAQs",
      link: "/Faqs",
      icon: faCircleQuestion,
    },
    {
      name: "Add User",
      link: "/AddUser",
      icon: faUserPlus,
    },
  ];

  return (
    <>
      {sessionUser && (
        <div
          className={`py-16 bg-dark-blue fixed h-screen transition-all ${
            sidebarOpen
              ? "top-24 sm:top-32 left-0"
              : "top-24 sm:top-32 -left-[356.75px]"
          }`}
        >
          <div>
            <ul className="text-shady-white">
              {Navigation &&
                Navigation.map((item, index) => {
                  return (
                    <Link key={index} href={item.link}>
                      <li
                        className={`transition-all py-5 pl-10 pr-28 hover:bg-gunmetal cursor-pointer flex ${
                          params == item.link ? "bg-gunmetal" : ""
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          className="h-6 w-6 mr-3"
                        />
                        {item.name}
                      </li>
                    </Link>
                  );
                })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default SideNavbar;

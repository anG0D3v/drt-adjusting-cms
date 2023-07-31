import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faBuilding,
  faCommentDots,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";

function SideNavbar({
  setSidebarOpen,
}: {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const Navigation = [
    {
      name: "How Can We Help You",
      link: "/#howcanwehelpyou",
      icon: faLayerGroup,
    },
    {
      name: "About Us",
      link: "/#aboutus",
      icon: faBuilding,
    },
    {
      name: "Client Testimony",
      link: "/#clienttestimony",
      icon: faCommentDots,
    },
    {
      name: "FAQs",
      link: "/#faqs",
      icon: faCircleQuestion,
    },
  ];

  return (
    <div>
      <ul className="text-shady-white">
        {Navigation &&
          Navigation.map((item, index) => {
            return (
              <Link key={index} href={item.link}>
                <li className="transition-all py-5 pl-10 pr-28 hover:bg-gunmetal cursor-pointer flex">
                  <FontAwesomeIcon icon={item.icon} className="h-6 w-6 mr-3" />
                  {item.name}
                </li>
              </Link>
            );
          })}
      </ul>
    </div>
  );
}

export default SideNavbar;

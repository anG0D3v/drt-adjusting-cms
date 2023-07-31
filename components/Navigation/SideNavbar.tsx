import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faBuilding,
  faCommentDots,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

function SideNavbar({
  setSidebarOpen,
}: {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
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
  ];

  return (
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

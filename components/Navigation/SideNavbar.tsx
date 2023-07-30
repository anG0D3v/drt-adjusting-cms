import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";

function SideNavbar({
  setSidebarOpen,
}: {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const Navigation = [
    {
      name: "How Can We Help You",
      link: "/#howcanwehelpyou",
    },
    {
      name: "About Us",
      link: "/#aboutus",
    },
    {
      name: "Client Testimony",
      link: "/#clienttestimony",
    },
    {
      name: "FAQs",
      link: "/#faqs",
    },
  ];

  return (
    <div>
      <ul className="text-shady-white">
        {Navigation &&
          Navigation.map((item, index) => {
            return (
              <Link key={index} href={item.link}>
                <li className="transition-all py-5 pl-10 pr-28 hover:bg-gunmetal cursor-pointer">
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

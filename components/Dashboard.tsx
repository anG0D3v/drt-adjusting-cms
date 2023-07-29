import React from "react";
import HowCanWeHelpYouSvg from "@/helpers/svg/HowCanWeHelpYouSvg";
import AboutUsSvg from "@/helpers/svg/AboutUsSvg";
import ClientTestimonySvg from "@/helpers/svg/ClientTestimonySvg";
import FAQsSvg from "@/helpers/svg/FAQsSvg";

function Dashboard() {
  const createItem = [
    {
      name: "How Can We Help You",
      image: <HowCanWeHelpYouSvg />,
    },
    {
      name: "About Us",
      image: <AboutUsSvg />,
    },
    {
      name: "Client Testimony",
      image: <ClientTestimonySvg />,
    },
    {
      name: "FAQs",
      image: <FAQsSvg />,
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="max-w-[1600px] my-10 sm:my-20 mx-auto w-full px-6">
        <div>
          <h1 className="text-3xl font-bold text-shady-white mb-10">
            Dashboard
          </h1>
          <div className="flex flex-wrap justify-center lg:justify-start gap-12">
            {createItem &&
              createItem.map((item, index) => {
                return (
                  <button
                    key={index}
                    className="flex flex-col w-48 justify-start items-center px-10 pt-10 pb-5 bg-gunmetal text-md text-shady-white font-bold rounded-lg"
                  >
                    <div className="mb-5">{item.image}</div>
                    {item.name}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

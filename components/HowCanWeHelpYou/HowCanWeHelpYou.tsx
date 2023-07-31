import React from "react";
import HowCanWeHelpYouTable from "./HowCanWeHelpYouTable";

function HowCanWeHelpYou() {
  const ServicesData = [
    {
      title: "Communication",
      image: "/img/example.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec.",
    },
    {
      title: "Collaboration",
      image: "/img/example.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec.",
    },
    {
      title: "Creativity",
      image: "/img/example.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec.",
    },
  ];

  return (
    <div className="flex flex-col w-ful">
      <div className="max-w-[1600px] my-10 sm:my-20 mx-auto px-6 md:px-20">
        <div>
          <h1 className="text-3xl font-bold text-deep-black mb-10">
            <span className="text-gunmetal">Create</span> How Can We Help You
          </h1>
          <div className="">
            <div className="block sm:flex sm:space-x-10 space-y-8 sm:space-y-0 mb-8">
              <div className="space-y-2">
                <label className="text-md font-medium" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Graphic Design"
                />
              </div>
              <div className="space-y-2">
                <label className="text-md font-medium" htmlFor="image">
                  Image
                </label>
                <label className="block">
                  <input
                    id="image"
                    type="file"
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py- file:px-4 file:rounded-full file:border-0 file:text- file:font-semibold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200 file:py-2
    "
                  />
                </label>
              </div>
            </div>
            <div className="mb-10 space-y-2">
              <label className="text-md font-medium" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                cols={50}
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec."
              />
            </div>
            <div className="flex justify-end mb-10">
              <button className="py-2 px-5 rounded-md mb-2 text-shady-white bg-steel-blue transition-all hover:scale-95">
                {/* <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="h-5 w-5 mr-1"
                /> */}
                Submit
              </button>
            </div>
          </div>
        </div>
        <HowCanWeHelpYouTable ServicesData={ServicesData} />
      </div>
    </div>
  );
}

export default HowCanWeHelpYou;

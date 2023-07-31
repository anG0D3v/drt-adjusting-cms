import React from "react";
import Image from "next/image";

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
            How Can We Help You
          </h1>
          <div className="">
            <div className="block sm:flex space-x-10 mb-10">
              <div>
                <h5 className="text-md font-medium mb-1">Title</h5>
                <input
                  type="text"
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Graphic Design"
                />
              </div>
              <div>
                <h5 className="text-md font-medium mb-1">Image</h5>
                <label className="block">
                  <input
                    type="file"
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py- file:px-4 file:rounded-full file:border-0 file:text- file:font-semibold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200 file:py-2
    "
                  />
                </label>
              </div>
            </div>
            <div className="mb-10">
              <h5 className="text-md font-medium mb-1">Description</h5>
              <textarea
                rows={4}
                cols={50}
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec."
              />
            </div>
          </div>
        </div>
        <div className="rounded-lg overflow-auto shadow-lg max-w-[300px] xxs:max-w-[380px] xs:max-w-[450px] sm:max-w-[900px] w-full">
          <table className="table-auto border border-gray-100 w-full">
            <thead className="bg-gray-300">
              <tr className="">
                <th className="p-5">Title</th>
                <th className="p-5">Image</th>
                <th className="p-5">Description</th>
              </tr>
            </thead>
            <tbody className="">
              {ServicesData &&
                ServicesData.map((item, index) => {
                  return (
                    <tr key={index} className="bg-gray-50 even:bg-gray-200">
                      <td className="py-5 px-5">{item.title}</td>
                      <td className="py-5 px-5">
                        <Image
                          src={item.image}
                          width={400}
                          height={400}
                          alt="example"
                        />
                      </td>
                      <td className="py-5 px-5">{item.description}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HowCanWeHelpYou;

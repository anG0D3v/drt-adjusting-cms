import React from "react";
import { Fragment } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";

type Services = {
  ServicesData: {
    title: string;
    image: string;
    description: string;
  }[];
};

function HowCanWeHelpYouTable({ ServicesData }: Services) {
  return (
    <Fragment>
      <div className="rounded-lg overflow-auto shadow-lg max-w-[300px] xxs:max-w-[380px] xs:max-w-[450px] sm:max-w-[900px] w-full">
        <table className="table-auto border border-gray-100 w-full">
          <thead className="bg-gray-300">
            <tr className="divide-x-2">
              <th className="p-5">Action</th>
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
                    <td className="py-5 px-5 w-[160px]">
                      <div className="block">
                        <button className="py-2 px-5 rounded-md mb-2 text-shady-white bg-gunmetal transition-all hover:scale-95">
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="h-5 w-5 mr-1"
                          />
                          Edit
                        </button>
                        <button className="py-2 px-5 rounded-md text-shady-white bg-maroon/90 transition-all hover:scale-95">
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            className="h-5 w-5 mr-1"
                          />
                          Delete
                        </button>
                      </div>
                    </td>
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
    </Fragment>
  );
}

export default HowCanWeHelpYouTable;

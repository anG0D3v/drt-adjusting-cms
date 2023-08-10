"use client";
import React, { useState } from "react";
import { Fragment, Dispatch } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faXmarkCircle,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

type AboutUs = {
  title?: string;
  content?: string;
  created_by?: number;
  status?: boolean;
  id?: number;
}[];

function AboutUsTable({
  AboutUsData,
  setIsOpen,
  setCurrentId,
  setStatusModalOpen,
  setCheckIfSomeActiveStatus,
  setOpenWarningModal,
}: {
  AboutUsData: AboutUs;
  setIsOpen: Dispatch<boolean>;
  setCurrentId: Dispatch<number>;
  setStatusModalOpen: Dispatch<boolean>;
  setCheckIfSomeActiveStatus: Dispatch<boolean>;
  setOpenWarningModal: Dispatch<boolean>;
}) {
  console.log(AboutUsData);
  const [searchItem, setSearchItem] = useState("");

  const thereIsActiveData = AboutUsData.some((item) => {
    return item.status === true;
  });

  const filteredData =
    AboutUsData &&
    AboutUsData.filter(
      (item) =>
        item.title?.toLowerCase().includes(searchItem.toLowerCase()) ||
        item.content?.toLowerCase().includes(searchItem.toLowerCase())
    );

  return (
    <Fragment>
      <div className="relative rounded-md shadow-sm">
        <input
          onChange={(e) => {
            setSearchItem(e.target.value);
          }}
          type="text"
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Search..."
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="max-w-[1000px] w-full overflow-hidden pb-10 px-4 sm:px-1">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Action
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Id
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Content
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Created By
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredData
                      .slice(0)
                      .reverse()
                      .map((item, index) => (
                        <tr key={index}>
                          <td className=" py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            <div className="block">
                              <button
                                onClick={() => {
                                  // check there is active data
                                  if (
                                    item.status == false &&
                                    thereIsActiveData
                                  ) {
                                    setOpenWarningModal(true);
                                  } else {
                                    setStatusModalOpen(true);
                                    setCurrentId(item.id as number);
                                  }
                                }}
                                type="button"
                                className={`${
                                  item.status ? "bg-blue-500" : "bg-maroon/90"
                                } flex py-2 px-5 mb-2 rounded-md text-shady-white transition-all hover:scale-95`}
                              >
                                <FontAwesomeIcon
                                  icon={
                                    item.status ? faCircleCheck : faXmarkCircle
                                  }
                                  className="h-5 w-5 mr-1"
                                />
                                {item.status ? "Active" : "Inactive"}
                              </button>
                              <button
                                onClick={() => {
                                  setIsOpen(true);
                                  setCurrentId(item.id as number);
                                }}
                                type="button"
                                className="flex py-2 px-5 rounded-md text-shady-white bg-gunmetal transition-all hover:scale-95"
                              >
                                <FontAwesomeIcon
                                  icon={faPenToSquare}
                                  className="h-5 w-5 mr-1"
                                />
                                Edit
                              </button>
                            </div>
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {item.id}
                          </td>

                          <td className="px-3 py-4 text-sm text-gray-500">
                            {item.title}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {item.content}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {item.created_by}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AboutUsTable;

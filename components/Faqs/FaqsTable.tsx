import React from "react";
import { Fragment, Dispatch } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faXmarkCircle,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

type Faqs = {
  id?: number;
  question?: string;
  answer?: string;
  created_by?: string;
}[];

function FaqsTable({
  FaqsData,
  setIsOpen,
  setCurrentId,
  setIsDeleteModalOpen,
}: {
  FaqsData: Faqs;
  setIsOpen: Dispatch<boolean>;
  setCurrentId: Dispatch<number>;
  setIsDeleteModalOpen: Dispatch<boolean>;
}) {
  return (
    <Fragment>
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
                        Question
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Answer
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
                    {FaqsData &&
                      FaqsData.slice(0)
                        .reverse()
                        .map((item, index) => (
                          <tr key={index}>
                            <td className=" py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              <div className="block">
                                <button
                                  onClick={() => {
                                    setIsOpen(true);
                                    setCurrentId(item.id as number);
                                  }}
                                  type="button"
                                  className="flex py-2 px-5 mb-2 rounded-md text-shady-white bg-gunmetal transition-all hover:scale-95"
                                >
                                  <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    className="h-5 w-5 mr-1"
                                  />
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    setIsDeleteModalOpen(true);
                                    setCurrentId(item.id as number);
                                  }}
                                  type="button"
                                  className="flex py-2 px-5 rounded-md text-shady-white bg-maroon/90 transition-all hover:scale-95"
                                >
                                  <FontAwesomeIcon
                                    icon={faXmarkCircle}
                                    className="h-5 w-5 mr-1"
                                  />
                                  Delete
                                </button>
                              </div>
                            </td>
                            <td className="px-3 py-4 text-sm text-gray-500">
                              {item.id}
                            </td>

                            <td className="px-3 py-4 text-sm text-gray-500">
                              {item.question}
                            </td>
                            <td className="px-3 py-4 text-sm text-gray-500">
                              {item.answer}
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

export default FaqsTable;

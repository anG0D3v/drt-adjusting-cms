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
import Pagination from "../Pagination";
type ClientTestimonyData = {
  name?: string;
  company_name?: string;
  position?: string;
  image_url?: string | null;
  content?: string;
  status?: boolean;
  id: number;
  CreatedByUser?: { username: string } | null;
  ModifiedByUser?: { username: string } | null;
}[];

function ClientTestimonyTable({
  ClientTestimonyData,
  setIsOpen,
  setCurrentId,
  setIsDeleteModalOpen,
}: {
  ClientTestimonyData: ClientTestimonyData;
  setIsOpen: Dispatch<boolean>;
  setCurrentId: Dispatch<number>;
  setIsDeleteModalOpen: Dispatch<boolean>;
}) {
  const [searchItem, setSearchItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const imageurl = process.env.BASE_IMAGE_URL as string;
  // Current Viewed Data
  const currentPost = ClientTestimonyData.sort((a, b) => b.id - a.id).slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Choose between search item or pagination
  const filteredData =
    searchItem === ""
      ? currentPost.filter((item) => {
          const status = item.status ? "disable" : "enable";

          return (
            item.name?.toLowerCase().includes(searchItem.toLowerCase()) ||
            item.position?.toLowerCase().includes(searchItem.toLowerCase()) ||
            item.company_name
              ?.toLowerCase()
              .includes(searchItem.toLowerCase()) ||
            item.content?.toLowerCase().includes(searchItem.toLowerCase()) ||
            status.toLowerCase().includes(searchItem.toLowerCase())
          );
        })
      : ClientTestimonyData.filter((item) => {
          const status = item.status ? "disable" : "enable";

          return (
            item.name?.toLowerCase().includes(searchItem.toLowerCase()) ||
            item.position?.toLowerCase().includes(searchItem.toLowerCase()) ||
            item.company_name
              ?.toLowerCase()
              .includes(searchItem.toLowerCase()) ||
            item.content?.toLowerCase().includes(searchItem.toLowerCase()) ||
            status.toLowerCase().includes(searchItem.toLowerCase())
          );
        });

  return (
    <Fragment>
      <div className="relative rounded-md shadow-sm mb-5">
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
      <Pagination
        postPerPage={postsPerPage}
        totalPosts={ClientTestimonyData.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
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
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Position
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Company Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Created By
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Modified By
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredData.map((item, index) => (
                      <tr key={index}>
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {item.name}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {item.image_url !== null && (
                            <Image
                              src={imageurl + item.image_url}
                              width={500}
                              height={500}
                              alt="image"
                            />
                          )}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {item.position}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {item.company_name}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {item.content}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {item.CreatedByUser?.username !== null
                            ? item.CreatedByUser?.username
                            : ""}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {item.ModifiedByUser?.username !== null
                            ? item.ModifiedByUser?.username
                            : ""}
                        </td>
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
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
                              className={`${
                                item.status ? "bg-maroon/90" : "bg-blue-500"
                              } flex py-2 px-5 mb-2 rounded-md text-shady-white transition-all hover:scale-95`}
                            >
                              <FontAwesomeIcon
                                icon={faXmarkCircle}
                                className="h-5 w-5 mr-1"
                              />
                              {item.status ? "Disable" : "Enable"}
                            </button>
                          </div>
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

export default ClientTestimonyTable;

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Dispatch } from "react";

export default function Pagination({
  postPerPage,
  totalPosts,
  currentPage,
  setCurrentPage,
}: {
  postPerPage: number;
  totalPosts: number;
  currentPage: number;
  setCurrentPage: Dispatch<number>;
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }
  const howManyPages = totalPosts / postPerPage;
  const roundHowManyPages = parseInt(howManyPages.toFixed());

  const firstNumber = (currentPage - 1) * postPerPage + 1;
  const lastNumberCal = firstNumber - 1;
  const lastNumber = Math.min(lastNumberCal + postPerPage, totalPosts);
 
  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 pt-3"
      aria-label="Pagination"
    >
      <div className="block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{firstNumber}</span> to{" "}
          <span className="font-medium">{lastNumber}</span> of{" "}
          <span className="font-medium">{totalPosts}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-end">
        <button
          disabled={currentPage <= 1 ? true : false}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Previous
        </button>
        <button
          disabled={lastNumber >= totalPosts ? true : false}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
          className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Next
        </button>
      </div>
    </nav>
  );
}

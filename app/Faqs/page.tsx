"use client";
import React, { useState, useEffect } from "react";
import FaqsTable from "@/components/Faqs/FaqsTable";
import Content from "@/components/Faqs/Content";
import EditFaqs from "@/components/Faqs/EditFaqs";
import DeleteFaqs from "@/components/Faqs/DeleteFaqs";
function page() {
  const [faqsData, setFaqsData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(
          `${process.env.DEV_API}/api/faqs/fetch`
          // "https://jsonplaceholder.typicode.com/users"
        ).then((res) => {
          return res.json();
        });
        setFaqsData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItem();
  }, [dataUpdate]);

  return (
    <div className="flex flex-col w-ful">
      <div className="max-w-[1600px] my-10 sm:my-20 mx-auto px-6 md:px-20 overflow-x-auto w-full">
        <Content dataUpdate={dataUpdate} setDataUpdate={setDataUpdate} />
        <FaqsTable
          FaqsData={faqsData}
          setIsOpen={setIsEditModalOpen}
          setCurrentId={setCurrentId}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      </div>

      {currentId !== 0 && (
        <EditFaqs
          FaqsData={faqsData}
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          currentId={currentId}
          setDataUpdate={setDataUpdate}
          dataUpdate={dataUpdate}
        />
      )}

      {currentId !== 0 && (
        <DeleteFaqs
          FaqsData={faqsData}
          currentId={currentId}
          isOpen={isDeleteModalOpen}
          setIsOpen={setIsDeleteModalOpen}
          setDataUpdate={setDataUpdate}
          dataUpdate={dataUpdate}
        />
      )}
    </div>
  );
}

export default page;

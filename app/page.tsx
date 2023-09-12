"use client";
import React, { useState, useEffect } from "react";
import Content from "@/components/HowCanWeHelpYou/Content";
import HowCanWeHelpYouTable from "@/components/HowCanWeHelpYou/HowCanWeHelpYouTable";
import EditHCWHY from "@/components/HowCanWeHelpYou/EditHCWHY";
import DeleteHCWHY from "@/components/HowCanWeHelpYou/DeleteHCWHY";

function Page() {
  const [howCanWeHelpYouData, setHowCanWeHelpYouData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(
          `${process.env.DEV_API}/api/services/fetch`
        ).then((res) => {
          return res.json();
        });

        setHowCanWeHelpYouData(response.data);
      } catch (error) {
      }
    };
    fetchItem();
  }, [dataUpdate]);

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1600px] my-10 sm:my-20 mx-auto px-6 md:px-20 overflow-x-auto w-full">
        <Content setDataUpdate={setDataUpdate} dataUpdate={dataUpdate} />
        <HowCanWeHelpYouTable
          HowCanWeHelpYouData={howCanWeHelpYouData}
          setIsOpen={setIsEditModalOpen}
          setCurrentId={setCurrentId}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      </div>

      {currentId !== 0 && (
        <EditHCWHY
          HowCanWeHelpYouData={howCanWeHelpYouData}
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          currentId={currentId}
          setDataUpdate={setDataUpdate}
          dataUpdate={dataUpdate}
        />
      )}

      {currentId !== 0 && (
        <DeleteHCWHY
          HowCanWeHelpYouData={howCanWeHelpYouData}
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

export default Page;

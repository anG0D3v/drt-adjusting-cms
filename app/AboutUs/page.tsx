"use client";
import React, { useState, useEffect } from "react";
import Content from "@/components/AboutUs/Content";
import AboutUsTable from "@/components/AboutUs/AboutUsTable";
import EditAboutUs from "@/components/AboutUs/EditAboutUs";
import StatusAboutUs from "@/components/AboutUs/Status/StatusAboutUs";
import WarningStatus from "@/components/AboutUs/Status/WarningStatus";

function page() {
  const [aboutUsData, setAboutUsData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStatusModalOpen, setStatusModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [checkIfSomeActiveStatus, setCheckIfSomeActiveStatus] = useState(false);
  const [openWarningModal, setOpenWarningModal] = useState(false);

  console.log(currentId);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(
          `${process.env.DEV_API}/api/about-us/fetch`
          // "https://jsonplaceholder.typicode.com/users"
        ).then((res) => {
          return res.json();
        });
        setAboutUsData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItem();
  }, [dataUpdate]);

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1600px] my-10 sm:my-20 mx-auto px-6 md:px-20 overflow-x-auto w-full">
        <Content setDataUpdate={setDataUpdate} dataUpdate={dataUpdate} />
        <AboutUsTable
          AboutUsData={aboutUsData}
          setIsOpen={setIsEditModalOpen}
          setStatusModalOpen={setStatusModalOpen}
          setCurrentId={setCurrentId}
          setCheckIfSomeActiveStatus={setCheckIfSomeActiveStatus}
          setOpenWarningModal={setOpenWarningModal}
        />
      </div>

      {currentId !== 0 && (
        <EditAboutUs
          AboutUsData={aboutUsData}
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          currentId={currentId}
          setDataUpdate={setDataUpdate}
          dataUpdate={dataUpdate}
        />
      )}
      {currentId !== 0 && (
        <StatusAboutUs
          AboutUsData={aboutUsData}
          isOpen={isStatusModalOpen}
          setIsOpen={setStatusModalOpen}
          currentId={currentId}
          setDataUpdate={setDataUpdate}
          dataUpdate={dataUpdate}
        />
      )}

      <WarningStatus
        openWarningModal={openWarningModal}
        setOpenWarningModal={setOpenWarningModal}
      />
    </div>
  );
}

export default page;

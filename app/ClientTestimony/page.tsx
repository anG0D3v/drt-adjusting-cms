"use client";
import React, { useState, useEffect } from "react";
import Content from "@/components/ClientTestimony/Content";
import ClientTestimonyTable from "@/components/ClientTestimony/ClientTestimonyTable";
import EditClientTestimony from "@/components/ClientTestimony/EditClientTestimony";
import DeleteClientTestimony from "@/components/ClientTestimony/DeleteClientTestimony";

function Page() {
  const [clientTestimonyData, setClientTestimonyData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(
          `${process.env.DEV_API}/api/testimonies/all`
        ).then((res) => {

          return res.json();
        });

        setClientTestimonyData(response.data);
      } catch (error) {
      }
    };
    fetchItem();
  }, [dataUpdate]);

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1600px] my-10 sm:my-20 mx-auto px-6 md:px-20 overflow-x-auto w-full">
        <Content setDataUpdate={setDataUpdate} dataUpdate={dataUpdate} />
        <ClientTestimonyTable
          ClientTestimonyData={clientTestimonyData}
          setIsOpen={setIsEditModalOpen}
          setCurrentId={setCurrentId}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      </div>

      {currentId !== 0 && (
        <EditClientTestimony
          ClientTestimonyData={clientTestimonyData}
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          currentId={currentId}
          setDataUpdate={setDataUpdate}
          dataUpdate={dataUpdate}
        />
      )}

      {currentId !== 0 && (
        <DeleteClientTestimony
          ClientTestimonyData={clientTestimonyData}
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

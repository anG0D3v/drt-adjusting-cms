import { Fragment, useState, Dispatch, useEffect, useMemo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { QUILL_FORMATS, QUILL_MODULES } from "@/helpers/constant";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css"; // Import Quill styles

type ClientTestimonyData = {
  name: string;
  company_name: string;
  position: string;
  image_url: string | null;
  content: string;
  status: boolean;
  id: number;
  created_by: number;
}[];

export default function EditHCWHY({
  ClientTestimonyData,
  isOpen,
  setIsOpen,
  currentId,
  setDataUpdate,
  dataUpdate,
}: {
  ClientTestimonyData: ClientTestimonyData;
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  currentId: number;
  setDataUpdate: Dispatch<boolean>;
  dataUpdate: boolean;
}) {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [isOpen]
  );

  const { data: session } = useSession();
  const sessionUser = session?.user;

  const [isLoading, setIsLoading] = useState(false);

  const newItem = ClientTestimonyData.filter((item) => {
    return item.id == currentId;
  });
  const { register, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: {
      name: newItem[0].name,
      position: newItem[0].position,
      companyName: newItem[0].company_name,
      content: newItem[0].content,
      created_by: newItem[0].created_by,
      image: "",
    },
  });

  // to reset the defaultValues wheneven isOpen is triggered
  useEffect(() => {
    reset({
      name: newItem[0].name,
      position: newItem[0].position,
      companyName: newItem[0].company_name,
      content: newItem[0].content,
      created_by: newItem[0].created_by,
      image: "",
    });
  }, [isOpen]);

  const onSubmit = handleSubmit(async (data) => {
    if (data.content == "<p><br></p>") {
      toast.error("Description is required");
    } else {
      const toastId = toast.loading("Loading...");
      setIsLoading(true);
      try {
        var formData = new FormData();
        formData.append("name", data.name);
        formData.append("position", data.position);
        formData.append("company_name", data.companyName);
        formData.append("content", data.content);
        if (data.image[0] !== undefined && data.image[0] !== null) {
          formData.append("file", data?.image[0]);
        }
        formData.append("updated_by", sessionUser?.name as string);

        await axios
          .put(
            `${process.env.DEV_API}/api/testimonies/update?id=${currentId}`,
            formData
          )
          .then((res) => {
            if (res.status >= 200 && res.status <= 300) {
              toast.success("Successfully Updated a Content", {
                duration: 4000,
              });
              toast.dismiss(toastId);
              setDataUpdate(!dataUpdate);
              setIsLoading(false);
            } else {
              toast.error("Something Went Wrong!", { duration: 4000 });
              toast.dismiss(toastId);
              setIsLoading(false);
            }
          });
      } catch (error) {
        const axiosError = error as AxiosError<any>;
        toast.error("Something Went Wrong!", { duration: 4000 });
        toast.dismiss(toastId);
        setIsLoading(false);
      }
      setIsOpen(false);
    }
  });

  return (
    <Transition.Root show={isOpen as boolean} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Edit Client Testimony{" "}
                      <span className="text-dark-blue">
                        {" "}
                        : Item # {currentId}
                      </span>
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="">
                        <div className="block text-start sm:flex sm:space-x-10 space-y-8 sm:space-y-0 mb-5">
                          <div className="space-y-2">
                            <label
                              className="text-md font-medium"
                              htmlFor="name"
                            >
                              Name
                            </label>
                            <input
                              id="name"
                              type="text"
                              {...register("name", { required: true })}
                              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full sm:w-96 border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                              placeholder="Empowering Business Growth Through Innovation"
                            />
                          </div>
                        </div>
                        <div className="text-start mb-5 space-y-2">
                          <div className="space-y-2">
                            <label
                              className="text-md font-medium"
                              htmlFor="position"
                            >
                              Position
                            </label>
                            <input
                              id="position"
                              type="text"
                              {...register("position", { required: true })}
                              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full sm:w-96 border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                              placeholder="Empowering Business Growth Through Innovation"
                            />
                          </div>
                        </div>
                        <div className="text-start mb-5 space-y-2">
                          <div className="space-y-2">
                            <label
                              className="text-md font-medium"
                              htmlFor="companyName"
                            >
                              Company Name
                            </label>
                            <input
                              id="companyName"
                              type="text"
                              {...register("companyName", { required: true })}
                              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full sm:w-96 border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                              placeholder="Empowering Business Growth Through Innovation"
                            />
                          </div>
                        </div>
                        <div className="text-start flex flex-col space-y-2 mb-5">
                          <label
                            className="text-md font-medium"
                            htmlFor="image"
                          >
                            Image
                          </label>
                          <input
                            id="image"
                            type="file"
                            {...register("image", { required: false })}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                          />
                        </div>
                        <div className="text-start mb-5 space-y-2">
                          <label
                            className="text-md font-medium"
                            htmlFor="content"
                          >
                            Description{" "}
                            <span className="text-sm text-gray-700">
                              ( limit of 255 characters )
                            </span>
                          </label>
                          <div className="h-80">
                            <textarea
                              rows={4}
                              {...register("content", {
                                required: true,
                              })}
                              id="content"
                              hidden
                            />
                            <ReactQuill
                              className="h-60 sm:h-64"
                              theme="snow"
                              formats={QUILL_FORMATS}
                              modules={QUILL_MODULES}
                              defaultValue={getValues("content")}
                              onChange={(value) => setValue("content", value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row-reverse">
                  <button
                    disabled={isLoading ? true : false}
                    type="button"
                    className="py-2 px-5 rounded-md ml-3 text-shady-white bg-steel-blue transition-all hover:scale-95"
                    onClick={() => {
                      onSubmit();
                    }}
                  >
                    {isLoading ? "Submitting" : "Submit"}
                  </button>
                  <button
                    type="button"
                    className="py-2 px-5 rounded-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 bg-white text-gray-900 transition-all hover:scale-95"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

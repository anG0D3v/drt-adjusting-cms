import { Fragment, useState, Dispatch, useEffect, useMemo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { QUILL_FORMATS, QUILL_MODULES } from "@/helpers/constant";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css"; // Import Quill styles

type HowCanWeHelpYou = {
  title: string;
  description: string;
  created_by: number;
  id: number;
}[];

export default function EditHCWHY({
  HowCanWeHelpYouData,
  isOpen,
  setIsOpen,
  currentId,
  setDataUpdate,
  dataUpdate,
}: {
  HowCanWeHelpYouData: HowCanWeHelpYou;
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

  const newItem = HowCanWeHelpYouData.filter((item) => {
    return item.id == currentId;
  });
  const { register, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: {
      title: newItem[0].title,
      description: newItem[0].description,
      created_by: newItem[0].created_by,
      image: "",
    },
  });
  console.log(newItem[0].description);

  // to reset the defaultValues whenever isOpen is triggered
  useEffect(() => {
    reset({ title: newItem[0].title, description: newItem[0].description });
  }, [isOpen]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    if (data.description == "<p><br></p>") {
      toast.error("Description is required");
    } else {
      const toastId = toast.loading("Loading...");
      setIsLoading(true);
      try {
        var formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        if (data.image[0] !== undefined && data.image[0] !== null) {
          formData.append("file", data?.image[0]);
        }
        formData.append("updated_by", sessionUser?.name as string);

        await axios
          .put(
            `${process.env.DEV_API}/api/services/update?id=${currentId}`,
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
      setDataUpdate(!dataUpdate);
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
                      Edit Service{" "}
                      <span className="text-dark-blue">
                        {" "}
                        : Item # {currentId}
                      </span>
                    </Dialog.Title>
                    <div className="mt-2">
                      <div>
                        <div className="block text-start sm:flex sm:space-x-10 space-y-8 sm:space-y-0 mb-5">
                          <div className="space-y-2">
                            <label
                              className="text-md font-medium"
                              htmlFor="title"
                            >
                              Title
                            </label>
                            <input
                              id="title"
                              type="text"
                              {...register("title", { required: true })}
                              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full sm:w-96 border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                              placeholder="Empowering Business Growth Through Innovation"
                            />
                          </div>
                        </div>
                        <div className="mb-5 text-start space-y-2">
                          <label
                            className="text-md font-medium"
                            htmlFor="description"
                          >
                            Description{" "}
                            <span className="text-sm text-gray-700">
                              ( limit of 255 characters )
                            </span>
                          </label>
                          <div className="h-80">
                            <textarea
                              rows={4}
                              {...register("description", {
                                required: true,
                              })}
                              id="description"
                              hidden
                            />
                            <ReactQuill
                              className="h-60 sm:h-64"
                              theme="snow"
                              formats={QUILL_FORMATS}
                              modules={QUILL_MODULES}
                              defaultValue={getValues("description")}
                              onChange={(value) =>
                                setValue("description", value)
                              }
                            />
                          </div>
                        </div>
                        <div className="mb-5 text-start space-y-2">
                          <div className="flex flex-col space-y-2">
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

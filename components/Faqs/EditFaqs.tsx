import { Fragment, useState, Dispatch, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { T_EditFaqs } from "@/types/global.d";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

type Faqs = {
  id: number;
  question: string;
  answer: string;
  created_by: number;
}[];

export default function EditFaqs({
  FaqsData,
  isOpen,
  setIsOpen,
  currentId,
  setDataUpdate,
  dataUpdate,
}: {
  FaqsData: Faqs;
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  currentId: number;
  setDataUpdate: Dispatch<boolean>;
  dataUpdate: boolean;
}) {
  const { data: session } = useSession();
  const sessionUser = session?.user;

  const newItem = FaqsData.filter((item) => {
    return item.id == currentId;
  });
  const { register, handleSubmit, reset, setValue } = useForm<T_EditFaqs>({
    defaultValues: {
      question: newItem[0].question,
      answer: newItem[0].answer,
      created_by: newItem[0].created_by,
    },
  });

  // to reset the defaultValues wheneven isOpen is triggered
  useEffect(() => {
    reset({ question: newItem[0].question, answer: newItem[0].answer });
  }, [isOpen]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      await axios
        .put(`${process.env.DEV_API}/api/faqs/update?id=${currentId}`, {
          question: data.question,
          answer: data.answer,
          updated_by: sessionUser?.name,
        })
        .then((res) => {
          console.log(res);

          if (res.status >= 200 && res.status <= 300) {
            toast.success("Successfully Updated a Content", { duration: 4000 });
            setDataUpdate(!dataUpdate);
          } else {
            toast.error("Something Went Wrong!", { duration: 4000 });
          }
        });
    } catch (error) {
      console.log(error);

      const axiosError = error as AxiosError<any>;
      console.log(axiosError);

      toast.error("Something Went Wrong!", { duration: 4000 });
    }
    setIsOpen(false);
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                      Edit Frequently Asked Questions :{" "}
                      <span className="text-dark-blue">Item # {currentId}</span>
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="">
                        <div className="block sm:flex sm:space-x-10 space-y-8 sm:space-y-0 mb-8">
                          <div className="space-y-2">
                            <label
                              className="text-md font-medium"
                              htmlFor="question"
                            >
                              Question
                            </label>
                            <input
                              id="question"
                              type="text"
                              {...register("question", { required: true })}
                              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full sm:w-96 border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                              placeholder="Empowering Business Growth Through Innovation"
                            />
                          </div>
                        </div>
                        <div className="mb-10 space-y-2">
                          <label
                            className="text-md font-medium"
                            htmlFor="answer"
                          >
                            Answer
                          </label>
                          <textarea
                            id="answer"
                            rows={10}
                            cols={50}
                            {...register("answer", { required: true })}
                            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="py-2 px-5 rounded-md ml-3 text-shady-white bg-steel-blue transition-all hover:scale-95"
                    onClick={() => {
                      onSubmit();
                    }}
                  >
                    Submit
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

import { Fragment, useRef, useState, Dispatch } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

type ClientTestimonyData = {
  id: number;
  question: string;
  answer: string;
  created_by: number;
  status: boolean;
}[];

function DeleteHCWHY({
  ClientTestimonyData,
  currentId,
  isOpen,
  setIsOpen,
  setDataUpdate,
  dataUpdate,
}: {
  ClientTestimonyData: ClientTestimonyData;
  currentId: number;
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  dataUpdate: boolean;
  setDataUpdate: Dispatch<boolean>;
}) {
  const { data: session } = useSession();
  const sessionUser = session?.user;

  const [isLoading, setIsLoading] = useState(false);

  const newItem = ClientTestimonyData.filter((item) => {
    return item.id == currentId;
  });

  const cancelButtonRef = useRef(null);

  const onSubmit = async () => {
    const toastId = toast.loading("Loading...");
    setIsLoading(true);

    try {
      await axios
        .delete(
          `${process.env.DEV_API}/api/testimonies/delete?id=${currentId}`,
          {
            data: { updated_by: sessionUser?.name },
          }
        )
        .then((res) => {
          if (res.status >= 200 && res.status <= 300) {
            toast.success(
              `Successfully ${
                newItem[0].status ? "Disabled" : "Enabled"
              } a Content`,
              { duration: 4000 }
            );
            setDataUpdate(!dataUpdate);
            toast.dismiss(toastId);
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
  };

  return (
    <Transition.Root show={isOpen as boolean} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setIsOpen}
      >
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
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                    <QuestionMarkCircleIcon
                      className="h-6 w-6 text-yellow-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {newItem[0].status ? "Disable Content" : "Enable Content"}
                    </Dialog.Title>
                    <div className="mt-3 mb-5">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to{" "}
                        {newItem[0].status ? "disable" : "enable"}{" "}
                        <span className="font-bold">
                          Item Number : {currentId}
                        </span>{" "}
                        ?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-row-reverse">
                  <button
                    disabled={isLoading ? true : false}
                    type="button"
                    className="py-2 px-5 rounded-md ml-3 text-shady-white bg-steel-blue transition-all hover:scale-95"
                    onClick={() => {
                      onSubmit();
                    }}
                  >
                    {newItem[0].status ? "Disable" : "Enable"}
                  </button>
                  <button
                    type="button"
                    className="py-2 px-5 rounded-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 bg-white text-gray-900 transition-all hover:scale-95"
                    onClick={() => setIsOpen(false)}
                    ref={cancelButtonRef}
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

export default DeleteHCWHY;

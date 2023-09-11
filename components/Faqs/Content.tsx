"use client";
import React, { useEffect, useState, Dispatch } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { QUILL_FORMATS, QUILL_MODULES } from "@/helpers/constant";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import Quill styles

function Content({
  setDataUpdate,
  dataUpdate,
}: {
  setDataUpdate: Dispatch<boolean>;
  dataUpdate: boolean;
}) {
  const { data: session } = useSession();
  const sessionUser = session?.user;
  const { register, handleSubmit, reset, setValue, getValues } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    if (data.answer == "<p><br></p>") {
      toast.error("Answer is required");
    } else {
      const toastId = toast.loading("Loading...");
      setIsLoading(true);
      try {
        const request = await axios
          .post(`${process.env.DEV_API}/api/faqs/add`, {
            question: data.question,
            answer: data.answer,
            created_by: sessionUser?.name,
          })
          .then((res) => {
            if (res.status >= 200 && res.status <= 300) {
              toast.success("Successfully Added a Content", { duration: 4000 });
              toast.dismiss(toastId);
              setDataUpdate(!dataUpdate);
              reset();
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
    }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-deep-black mb-10">
        <span className="text-gunmetal">Create</span> Fequently Asked Questions
      </h1>
      <form onSubmit={onSubmit} className="">
        <div className="block sm:flex sm:space-x-10 space-y-8 sm:space-y-0 mb-8">
          <div className="space-y-2">
            <label className="text-md font-medium" htmlFor="question">
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
          <label className="text-md font-medium" htmlFor="answer">
            Answer{" "}
            <span className="text-sm text-gray-700">
              ( limit of 255 characters )
            </span>
          </label>
          <div className="h-80 sm:h-40">
            <textarea
              rows={4}
              {...register("answer", {
                required: true,
              })}
              id="answer"
              hidden
            />
            <ReactQuill
              className="h-64 sm:h-32"
              theme="snow"
              formats={QUILL_FORMATS}
              modules={QUILL_MODULES}
              value={getValues("answer")}
              defaultValue={getValues("answer")}
              onChange={(value) => setValue("answer", value)}
            />
          </div>
        </div>
        <div className="flex justify-end mb-10">
          <button
            disabled={isLoading ? true : false}
            type="submit"
            className="py-2 px-5 rounded-md mb-2 text-shady-white bg-steel-blue transition-all hover:scale-95"
          >
            {isLoading ? "Submitting" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Content;

"use client";
import React, { useEffect, useState, Dispatch } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

function Content({
  setDataUpdate,
  dataUpdate,
}: {
  setDataUpdate: Dispatch<boolean>;
  dataUpdate: boolean;
}) {
  const { data: session } = useSession();
  const sessionUser = session?.user;
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    setIsLoading(true);
    const toastId = toast.loading("Loading...");
    try {
      const request = await axios
        .post(`${process.env.DEV_API}/api/faqs/add`, {
          question: data.question,
          answer: data.answer,
          created_by: sessionUser?.name,
        })
        .then((res) => {
          console.log(res);

          if (res.status >= 200 && res.status <= 300) {
            toast.success("Successfully Added a Content", { duration: 4000 });
            toast.dismiss(toastId);
            setIsLoading(false);
            setDataUpdate(!dataUpdate);
            reset();
          } else {
            toast.error("Something Went Wrong!", { duration: 4000 });
            toast.dismiss(toastId);
            setIsLoading(false);
          }
        });
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      console.log(axiosError);

      setIsLoading(false);
      toast.error("Something Went Wrong!", { duration: 4000 });
      toast.dismiss(toastId);
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
            Answer
          </label>
          <textarea
            id="answer"
            rows={4}
            cols={50}
            {...register("answer", { required: true })}
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec."
          />
        </div>
        <div className="flex justify-end mb-10">
          <button
            disabled={isLoading ? true : false}
            type="submit"
            className="py-2 px-5 rounded-md mb-2 text-shady-white bg-steel-blue transition-all hover:scale-95"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Content;

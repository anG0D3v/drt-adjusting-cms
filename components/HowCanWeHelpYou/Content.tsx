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
  console.log(sessionUser);
  console.log(session);

  console.log(sessionUser?.name);

  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    setIsLoading(true);
    const toastId = toast.loading("Loading...");

    try {
      var formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.content);
      if (data.image[0] !== undefined && data.image[0] !== null) {
        formData.append("file", data?.image[0]);
      }
      formData.append("created_by", sessionUser?.name as string);
      console.log(formData);

      await axios
        .post(`${process.env.DEV_API}/api/services/add`, formData)
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

      setError(axiosError?.response?.data.message);
      setIsLoading(false);
      toast.error("Something Went Wrong!", { duration: 4000 });
      toast.dismiss(toastId);
    }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-deep-black mb-6 sm:mb-10">
        <span className="text-gunmetal">Create</span> How Can We Help You
      </h1>
      <form onSubmit={onSubmit} className="">
        <div className="block sm:flex sm:space-x-10 space-y-8 sm:space-y-0 mb-8">
          <div className="xl:flex xl:space-x-5">
            <div className="space-y-2 mb-5 xl:mb-0">
              <label className="text-md font-medium" htmlFor="title">
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
            <div className="flex flex-col space-y-2">
              <label className="text-md font-medium" htmlFor="image">
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
        <div className="mb-10 space-y-2">
          <label className="text-md font-medium" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            cols={50}
            {...register("content", { required: true })}
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec."
          />
        </div>
        <div className="flex justify-end mb-5">
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

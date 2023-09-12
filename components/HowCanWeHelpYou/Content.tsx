"use client";
import React, { useEffect, useState, Dispatch } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { QUILL_FORMATS, QUILL_MODULES } from "@/helpers/constant";
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
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // react quill here

  // to here

  const onSubmit = handleSubmit(async (data) => {

    if (data.content == "<p><br></p>") {
      toast.error("Description is required");
    } else {

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

        await axios
          .post(`${process.env.DEV_API}/api/services/add`, formData)
          .then((res) => {
            if (res.status >= 200 && res.status <= 300) {
              toast.success("Successfully Added a Content", { duration: 4000 });
              toast.dismiss(toastId);
              setDataUpdate(!dataUpdate);
              setIsLoading(false);
              reset();
            } else {
              toast.error("Something Went Wrong!", { duration: 4000 });
              toast.dismiss(toastId);
              setIsLoading(false);
            }
          });
      } catch (error) {
        const axiosError = error as AxiosError<any>;

        setError(axiosError?.response?.data.message);
        toast.error("Something Went Wrong!", { duration: 4000 });
        toast.dismiss(toastId);
        setIsLoading(false);
      }
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
            Description{" "}
            <span className="text-sm text-gray-700">
              ( limit of 255 characters )
            </span>
          </label>
          <div className="h-80 sm:h-40">
            <textarea
              rows={4}
              {...register("content", {
                required: true,
              })}
              id="content"
              hidden
            />
            <ReactQuill
              className="h-64 sm:h-32"
              theme="snow"
              formats={QUILL_FORMATS}
              modules={QUILL_MODULES}
              value={getValues("content")}
              defaultValue={getValues("content")}
              onChange={(value) => setValue("content", value)}
            />
          </div>
        </div>
        <div className="flex justify-end mb-5">
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

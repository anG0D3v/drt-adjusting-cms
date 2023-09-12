"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

function Page() {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    const toastId = toast.loading("Loading...");
    setIsLoading(true);

    try {
      const response: any = await axios
        .post(`${process.env.DEV_API}/api/user/add`, {
          email: data.email,
          username: data.username,
          password: data.password,
        })
        .then((res) => {

          if (res.status >= 200 && res.status <= 300) {
            toast.success("Successfully Added a User", { duration: 4000 });
            toast.dismiss(toastId);
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

      setError(axiosError?.response?.data.message);
      toast.error("Something Went Wrong!", { duration: 4000 });
      toast.dismiss(toastId);
      setIsLoading(false);
    }
  });

  return (
    <div className="max-w-[1600px] my-10 sm:my-20 mx-auto px-0 sm:px-20">
      <div>
        <h1 className="text-3xl font-bold text-deep-black mb-10">
          <span className="text-gunmetal">Add</span> User
        </h1>
        <form onSubmit={onSubmit} className="block space-y-5">
          <div className="space-y-2">
            <label className="text-md font-medium" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username", { required: true })}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full sm:w-96 border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-md font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="text"
              {...register("email", { required: true })}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full sm:w-96 border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="johndoe@gmail.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-md font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: true })}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full sm:w-96 border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="********"
            />
          </div>
          <div>
            <p className="text-red-600 italic">{error !== "" && error}</p>
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
    </div>
  );
}

export default Page;

"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
function page() {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  const onLogin = async (e: any) => {
    const result = await signIn("credentials", {
      username: userCredentials.username,
      password: userCredentials.password,
      redirect: true,
      callbackUrl: "/",
    });
    console.log(result);
    console.log(userCredentials);
  };

  return (
    <div className="flex justify-center items-center lg:-ms-96 -mt-[95px] lg:-mt-[135px] h-screen w-screen px-6">
      <div className="w-96">
        <form
          onSubmit={onLogin}
          className="border p-10 rounded-xl shadow-lg outline-none"
        >
          <div className="flex flex-col items-center justify-center mb-5">
            <Image
              className=""
              src={"/img/company-logo.png"}
              width={150}
              height={140}
              alt="company-logo"
            />
          </div>
          <label htmlFor="username" className="text-md font-medium">
            User Name
          </label>
          <input
            id="username"
            name="username"
            type="email"
            className="mb-5 mt-1 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md p-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-md"
            placeholder="johndoe@gmail.com"
            onChange={(e) => {
              setUserCredentials((prevCredentials) => ({
                ...prevCredentials,
                [e.target.name]: e.target.value,
              }));
            }}
          />

          <label htmlFor="password" className="text-md font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="mb-5 mt-1 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md p-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-md"
            placeholder="********"
            onChange={(e) => {
              setUserCredentials((prevCredentials) => ({
                ...prevCredentials,
                [e.target.name]: e.target.value,
              }));
            }}
          />

          <button
            type="submit"
            className="py-2 flex items-end justify-center w-full px-5 rounded-md mb-2 text-shady-white bg-steel-blue transition-all hover:scale-95 text-lg"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;

"use client";
import React, { FormEvent, useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
function Page() {
  const { data: session, status } = useSession();
  console.log(status);

  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  // console.log(process.env.DEV_API);
  const router = useRouter();

  if (status === "loading") {
    return <Loading />;
  } else if (status == "authenticated") {
    router.push("/");
  }

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("clicked");
    // console.log(userCredentials);

    if (userCredentials.username == "" && userCredentials.password == "") {
      console.log("username is required");
      setError("Username and Password is required");
    } else {
      const result: any = await signIn("credentials", {
        username: userCredentials.username,
        password: userCredentials.password,
        callbackUrl: "/",
        redirect: false,
      });

      if (result.error) {
        // Handle error display
        // Example: Pass the error message to the AuthError component
        setError("Incorrect Credentials");
      } else {
        router.push("/");
      }
    }
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
            type="text"
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
            className=" mt-1 mb-5 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md p-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-md"
            placeholder="********"
            onChange={(e) => {
              setUserCredentials((prevCredentials) => ({
                ...prevCredentials,
                [e.target.name]: e.target.value,
              }));
            }}
          />
          <div
            className={`${
              error == "" ? "hidden" : "block"
            } text-end -mt-2 mb-3 text-red-500 italic text-sm font-medium`}
          >
            <p>{error !== "" ? error : ""}*</p>
          </div>
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

export default Page;

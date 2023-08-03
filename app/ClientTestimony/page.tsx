import React from "react";
import ClientTestimonyTable from "@/components/ClientTestimony/ClientTestimonyTable";

function page() {
  const ClientTestimonyData = [
    {
      name: "John Doe",
      role: "Businessman",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus purus quam, eget feugiat arcu vehicula ut. Morbi lacinia scelerisque massa, ut placerat magna iaculis nec. Ut ut purus sollicitudin dolor porttitor suscipit. Donec vitae velit at odio consectetur.",
    },
    {
      name: "George Smith",
      role: "Graphic Designer",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus purus quam, eget feugiat arcu vehicula ut. Morbi lacinia scelerisque massa, ut placerat magna iaculis nec. Ut ut purus sollicitudin dolor porttitor suscipit. Donec vitae velit at odio consectetur.",
    },
    {
      name: "Ryan Clarckson",
      role: "Software Engineer",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus purus quam, eget feugiat arcu vehicula ut. Morbi lacinia scelerisque massa, ut placerat magna iaculis nec. Ut ut purus sollicitudin dolor porttitor suscipit. Donec vitae velit at odio consectetur.",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1600px] my-10 sm:my-20 mx-auto px-6 md:px-20">
        <div>
          <h1 className="text-3xl font-bold text-deep-black mb-10">
            <span className="text-gunmetal">Create</span> Client Testimony
          </h1>
          <div className="">
            <div className="block sm:flex sm:space-x-10 space-y-8 sm:space-y-0 mb-8">
              <div className="space-y-2">
                <label className="text-md font-medium" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-md font-medium" htmlFor="role">
                  Role
                </label>
                <input
                  id="role"
                  type="text"
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Graphic Designer"
                />
              </div>
            </div>
            <div className="mb-10 space-y-2">
              <label className="text-md font-medium" htmlFor="comment">
                Comment
              </label>
              <textarea
                id="comment"
                rows={4}
                cols={50}
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec."
              />
            </div>
            <div className="flex justify-end mb-10">
              <button className="py-2 px-5 rounded-md mb-2 text-shady-white bg-steel-blue transition-all hover:scale-95">
                {/* <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="h-5 w-5 mr-1"
                /> */}
                Submit
              </button>
            </div>
          </div>
        </div>
        <ClientTestimonyTable ClientTestimonyData={ClientTestimonyData} />
      </div>
    </div>
  );
}

export default page;

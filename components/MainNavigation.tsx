"use client";
import React, { useState } from "react";
import SideNavbar from "./Navigation/SideNavbar";
import Navigation from "./Navigation/Navigation";
import { Toaster } from "react-hot-toast";

function MainNavigation({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Navigation setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <div className="pt-[95px] lg:pt-[135px] flex justify-center sm:justify-start">
        <SideNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="lg:ps-96 overflow-auto">
          {children}
          <Toaster position="top-right" reverseOrder={true} />
        </div>
      </div>
    </>
  );
}

export default MainNavigation;

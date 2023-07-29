"use client";

import React, { useState, useEffect } from "react";

function CurrentDate() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [currentDateTime]);

  // Format the date
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(currentDateTime);
  const formattedTime = currentDateTime.toTimeString().split(" ")[0];

  return (
    <>
      <p className="relative text-xs font-normal">
        <span className="mr-14">{currentDateTime && formattedDate}</span>
        <span className="absolute top-0 right-0">
          {currentDateTime && formattedTime}
        </span>
      </p>
    </>
  );
}

export default CurrentDate;

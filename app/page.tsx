"use client";
import HowCanWeHelpYou from "@/components/HowCanWeHelpYou/HowCanWeHelpYou";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  return (
    <main>
      <HowCanWeHelpYou />
    </main>
  );
}

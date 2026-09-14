"use client";

import { usePathname } from "next/navigation";
import BackButton from "@/components/BackButton";

export default function Navigation() {
  const pathname = usePathname();

  // Don't show the Back button on the main page
  if (pathname === "/") {
    return null;
  }

  return <BackButton />;
}
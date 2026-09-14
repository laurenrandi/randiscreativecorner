"use client";

import Image from "next/image";
import { useState } from "react";

export default function ScrapbookTable() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsOpen(true)}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        height: "90%",
        padding: 0,
        border: "none",
        background: "none",
        cursor: "pointer",
        zIndex: 10,
      }}
    >
      <Image
        src={
          isOpen
            ? "/assets/film-studio/scrapbooks/tableopen.png"
            : "/assets/film-studio/scrapbooks/tableclosed.png"
        }
        alt="Scrapbook table"
        fill
        priority
        style={{
          objectFit: "contain",
        }}
      />
    </button>
  );
}
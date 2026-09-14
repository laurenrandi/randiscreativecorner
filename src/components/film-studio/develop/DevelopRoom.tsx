"use client";

import Image from "next/image";
import { useState } from "react";

import PhotoShelf from "./DevelopObjects/PhotoShelf";
import Photobox from "./DevelopObjects/Photobox";
import ViewingTable from "./DevelopObjects/ViewingTable";
import BackButton from "@/components/BackButton";

export default function DevelopRoom() {
  const [showPhotoBox, setShowPhotoBox] = useState(false);
  const [showViewingTable, setShowViewingTable] = useState(false);

  return (
    <div
      style={{
        position: "absolute",
        width: "min(90vw, 1200px)",
        aspectRatio: "1920 / 1080",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1,
      }}
    >
      {/* Develop Studio drawing */}
      <Image
        src="/assets/dark-room/darkroom1.png"
        alt="Develop Studio"
        fill
        priority
        style={{
          objectFit: "contain",
        }}
      />

      {/* Photo shelf */}
      {!showViewingTable && (
        <PhotoShelf
          onClick={() => {
            setShowPhotoBox(true);
          }}
        />
      )}

      {/* Photo box appears after clicking shelf */}
      {showPhotoBox && !showViewingTable && (
        <Photobox
            label="Photos"
            left="50%"
            top="50%"
            onClick={() => {
            setShowViewingTable(true);
            }}
        />
        )}

      {/* Viewing table appears after clicking photo box */}
      {showViewingTable && <ViewingTable />}
    </div>
  );
}
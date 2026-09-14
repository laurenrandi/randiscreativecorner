"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ViewingTable() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [developingPhoto, setDevelopingPhoto] = useState<string | null>(null);

  useEffect(() => {
    async function loadPhotos() {
      const response = await fetch("/api/portraits");
      const data = await response.json();

      setPhotos(data);
    }

    loadPhotos();
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        height: "90%",
        zIndex: 20,
      }}
    >
      {/* Illustrated viewing table */}
      <Image
        src="/assets/dark-room/phototable1.png"
        alt="Photo viewing table"
        fill
        priority
        style={{ objectFit: "contain" }}
      />

      {/* Film roll area */}
      <div
      className="photo-scroll"
        style={{
          position: "absolute",
          left: "15.5%",
          top: "16%",
          width: "70%",
          height: "60%",
          overflowY: "auto",
          padding: "30px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          {Array.from(
            { length: Math.ceil(photos.length / 3) },
            (_, rowIndex) => {
              const rowPhotos = photos.slice(
                rowIndex * 3,
                rowIndex * 3 + 3
              );

              return (
                <div
                  key={rowIndex}
                  style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    padding: "35px 25px",
background: "linear-gradient(135deg, rgba(33, 22, 2, 0.85), rgba(17, 9, 1, 0.75))",                    borderRadius: "4px",
                  }}
                >
                  {/* Top film holes */}
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "20px",
                      right: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: "15px",
                          height: "10px",
                          background: "#e1929f",
                          borderRadius: "2px",
                        }}
                      />
                    ))}
                  </div>

                  {/* Photos */}
                  {rowPhotos.map((photo) => (
                    <button
                        key={photo}
                        type="button"
                        onClick={() => {
                            setDevelopingPhoto(photo);
                            setTimeout(() => {
                                setSelectedPhoto(photo);
                                setDevelopingPhoto(null);
                            }, 100);
                            }}
                        style={{
                            width: "180px",
                            height: "120px",
                            boxSizing: "border-box",
                            border: "none",
                            cursor: "pointer",
                        }}
                        >
                        <img
                            src={`/photos/portraits/${photo}`}
                            alt={photo}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                                 borderRadius: "4px",
                                filter: "invert(0.85) sepia(1) saturate(1.8) hue-rotate(330deg) brightness(0.8) contrast(1.1)",                             }}
                        />
                        </button>
                  ))}

                  {/* Bottom film holes */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "5px",
                      left: "20px",
                      right: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: "15px",
                          height: "10px",
                          background: "#e1929f",
                          borderRadius: "2px",
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
      {(developingPhoto || selectedPhoto) && (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "rgba(0, 0, 0, 0.75)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50,
    }}
  >
    {/* Clickable left side */}
    <button
      type="button"
      aria-label="Back to film roll"
      onClick={() => {
        setSelectedPhoto(null);
        setDevelopingPhoto(null);
      }}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        border: "none",
        background: "transparent",
        cursor: "pointer",
      }}
    />

    {/* Large photo */}
    <img
      src={`/photos/portraits/${developingPhoto || selectedPhoto}`}
      alt={developingPhoto || selectedPhoto || ""}
      style={{
        maxWidth: "95%",
        maxHeight: "95%",
        objectFit: "contain",
        filter: developingPhoto
          ? "invert(0.75) sepia(1) saturate(1.8) hue-rotate(330deg) brightness(0.55) contrast(1.15)"
          : "none",
        transition: "filter 0.8s ease",
      }}
    />

    {/* Clickable right side */}
    <button
      type="button"
      aria-label="Back to film roll"
      onClick={() => {
        setSelectedPhoto(null);
        setDevelopingPhoto(null);
      }}
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        width: "100%",
        height: "100%",
        border: "none",
        background: "transparent",
        cursor: "pointer",
      }}
    />
  </div>
)}
    </div>
  );
}
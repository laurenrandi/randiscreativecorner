import Image from "next/image";

export default function StudioTable() {
  return (
    <div
      style={{
        position: "absolute",
        left: "52%",
        top: "61%",
        width: "29%",
        height: "34%",
        zIndex: 20,
      }}
    >
      <Image
        src="/assets/film-studio/table2.png"
        alt="Scrapbook viewing table"
        fill
        style={{
          objectFit: "contain",
        }}
      />
    </div>
  );
}
import Image from "next/image";
import Link from "next/link";

export default function DevelopDoor() {
  return (
    <Link
      href="/film-studio/develop"
      style={{
        position: "absolute",
        left: "66%",
        top: "18%",
        width: "15%",
        height: "46%",
        zIndex: 10,
        cursor: "pointer",
      }}
    >
      <Image
        src="/assets/film-studio/cleaneddoor.png"
        alt="Enter Develop Studios"
        fill
        style={{
          objectFit: "contain",
        }}
      />
    </Link>
  );
}
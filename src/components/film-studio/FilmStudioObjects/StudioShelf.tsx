import Image from "next/image";
import Link from "next/link";

export default function StudioShelf() {
  return (
    <Link
      href="/film-studio/scrapbooks"
      style={{
        position: "absolute",
        left: "25.5%",
        top: "10.5%",
        width: "30%",
        height: "50%",
        zIndex: 10,
      }}
    >
      <Image
        src="/assets/film-studio/bookshelf1.png"
        alt="Scrapbook shelf"
        fill
        style={{
          objectFit: "contain",
        }}
      />
    </Link>
  );
}
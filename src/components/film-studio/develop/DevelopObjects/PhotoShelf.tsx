import Image from "next/image";

type PhotoShelfProps = {
  onClick: () => void;
};

export default function PhotoShelf({ onClick }: PhotoShelfProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open photo archive"
      style={{
        position: "absolute",
        left: "20%",
        top: "24%",
        width: "15.2%",
        height: "35.2%",
        padding: 0,
        border: "none",
        background: "none",
        cursor: "pointer",
        zIndex: 10,
      }}
    >
      <Image
        src="/assets/dark-room/photoshelf.png"
        alt="Photo archive shelf"
        fill
        style={{
          objectFit: "contain",
        }}
      />
    </button>
  );
}
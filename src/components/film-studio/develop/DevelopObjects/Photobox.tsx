import Image from "next/image";

type PhotoBoxProps = {
  label: string;
  left: string;
  top: string;
  onClick: () => void;
};

export default function PhotoBox({
  label,
  left,
  top,
  onClick,
}: PhotoBoxProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${label} photos`}
      style={{
        position: "absolute",
        left,
        top,
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%",
        padding: 0,
        border: "none",
        background: "none",
        cursor: "pointer",
        zIndex: 20,
      }}
    >
      <Image
        src="/assets/dark-room/photobox1.png"
        alt=""
        fill
        style={{
          objectFit: "contain",
        }}
      />
    </button>
  );
}
import Image from "next/image";

export default function DoorLights() {
  return (
    <div
      style={{
        position: "absolute",
        left: "59%",
        top: "53%",
        width: "15%",
        height: "20%",
        zIndex: 9,
        pointerEvents: "none",
      }}
    >
      <Image
        src="/assets/film-studio/animatedlights-1.png"
        alt=""
        fill
        className="door-light light-one"
        style={{
          objectFit: "contain",
        }}
      />

      <Image
        src="/assets/film-studio/animatedlights-2.png"
        alt=""
        fill
        className="door-light light-two"
        style={{
          objectFit: "contain",
        }}
      />
    </div>
  );
}
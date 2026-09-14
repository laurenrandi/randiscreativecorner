import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
       {/* =========================
                BACKGROUND ANIMATIONS
            ========================== */}
      
            {/* Moving Clouds */}
            <div className="cloud-container">
              <Image
                src="/assets/location-selector/cloud.png"
                alt=""
                width={1920}
                height={300}
                className="cloud cloud-one"
                priority
              />
      
              <Image
                src="/assets/location-selector/cloud.png"
                alt=""
                width={1920}
                height={300}
                className="cloud cloud-two"
                priority
              />
            </div>
      
      
            {/* Left Leaves */}
            <Image
              src="/assets/location-selector/left-leaf.png"
              alt=""
              width={500}
              height={500}
              className="leaf left-leaf"
            />
      
      
            {/* Right Leaves */}
            <Image
              src="/assets/location-selector/right-leaf.png"
              alt=""
              width={500}
              height={500}
              className="leaf right-leaf"
            />
      {/* Welcome Page Background */}
      <Image
        src="/assets/welcome-page/welcome-background.png"
        alt="Randi's Creative Corner"
        fill
        priority
        style={{
          objectFit: "cover",
        }}
      />

      {/* Enter Button Overlay */}
      <Link
  href="/world"
  style={{
    position: "absolute",
    bottom: "8%",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
  }}
>
  <Image
    src="/assets/welcome-page/enter-button.png"
    alt="Enter My World"
    width={300}
    height={100}
    className="clickable-icon wiggle"
    style={{
      width: "300px",
      height: "auto",
    }}
  />
</Link>
    </main>
  );
}
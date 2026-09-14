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
      <div
  style={{
    position: "absolute",
    left: "0%",
    top: "72%",
    width: "40%",
    height: "70%",
    transform: "translateY(-50%)",
    zIndex: -10,
  }}
>
  <Image
    src="/assets/welcome-page/homescreenblink.gif"
    alt="blinking meee"
    fill
    priority
    unoptimized
    style={{
      objectFit: "contain",
    }}
  />
  
</div>
     <div
  style={{
    position: "absolute",
    right: "-5%",
    top: "38%",
    width: "45%",
    height: "75%",
    transform: "translateY(-50%)",
    zIndex: -10,
  }}
>
  <Image
    src="/assets/welcome-page/homescreenpose.png"
    alt="blinking meee"
    fill
    priority
    unoptimized
    style={{
      objectFit: "contain",
    }}
  />
  
</div>
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
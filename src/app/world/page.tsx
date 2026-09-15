import Image from "next/image";
import Link from "next/link";
import Background from "@/components/Background";
import MusicPlayer from "@/components/MusicPlayer";
import BackButton from "@/components/BackButton";
const places = [
  {
    name: "Art Museum",
    image: "/assets/location-selector/icons/art-icon.png",
    href: "/museum",
    delay: "0s",
    bool: true,
  },
  {
    name: "Dance Studio",
    image: "/assets/location-selector/icons/dance-icon.png",
    href: "/dance-studio",
    delay: "0.2s",
    bool: true,
  },
  {
    name: "Film Studio",
    image: "/assets/location-selector/icons/film-icon.png",
    href: "/film-studio",
    delay: "0.5s",
    bool: true,
  },
  {
    name: "Blog",
    image: "/assets/location-selector/icons/blog-icon.png",
    href: "/blog",
    delay: "0.3s",
    bool: false,
  },
  {
    name: "Craft Studio",
    image: "/assets/location-selector/icons/craft-icon.png",
    href: "/craft-studio",
    delay: "0.6s",
    bool: false,
  },
  {
    name: "Music Room",
    image: "/assets/location-selector/icons/music-icon.png",
    href: "/music-room",
    delay: "0.8s",
    bool: false,
  },
];

export default function World() {
  return (
    <main className="world-page">
      <Background />
 {/* =========================
          FOREGROUND CONTENT
      ========================== */}

      <div className="world-content">
         <div
        style={{
          position: "absolute",
          left: "-10%",
          top: "72%",
          width: "40%",
          height: "70%",
          transform: "translateY(-50%)",
          zIndex: -10000,
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
          right: "-10%",
          top: "38%",
          width: "45%",
          height: "75%",
          transform: "translateY(-50%)",
          zIndex: -10000,
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
      <BackButton href="/"/>
      {/* Choose Your Destination Title */}
     <div className="world-title">
      <Image
        src="/assets/location-selector/destination-title.png"
        alt="Choose Your Destination"
        width={700}
        height={200}
        priority
      />
      </div>
      <div className="world-grid">
  {places.map((place) => {
    const isLocked = !place.bool;

    const icon = (
      <Image
        src={place.image}
        alt={place.name}
        width={400}
        height={400}
        className="wiggle"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          animationDelay: place.delay,
          filter: isLocked
            ? "grayscale(100%)"
            : "none",
          opacity: isLocked ? 0.65 : 1,
        }}
      />
    );

    return (
      <div
        key={place.name}
        className="clickable-icon"
        style={{
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: isLocked
            ? "not-allowed"
            : "pointer",
        }}
      >
        {isLocked ? (
          icon
        ) : (
          <Link
            href={place.href}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {icon}
          </Link>
        )}
      </div>
    );
  })}
</div>
      </div>
    </main>
  );
}
import Image from "next/image";

export default function FilmStudioBackground() {
  return (
    <>
      {/* Clouds */}
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

      {/* Left leaf */}
      <Image
        src="/assets/location-selector/left-leaf.png"
        alt=""
        width={500}
        height={500}
        className="leaf left-leaf"
      />

      {/* Right leaf */}
      <Image
        src="/assets/location-selector/right-leaf.png"
        alt=""
        width={500}
        height={500}
        className="leaf right-leaf"
      />
    </>
  );
}
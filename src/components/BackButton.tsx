"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type BackButtonProps = {
  href?: string;
};

export default function BackButton({ href }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleBack}
      className="back-button"
      aria-label="Go back"
    >
      <Image
        src="/assets/ui/backbutton.png"
        alt="Go back"
        width={120}
        height={120}
      />
    </button>
  );
}
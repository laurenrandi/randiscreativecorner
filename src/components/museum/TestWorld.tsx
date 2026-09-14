"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import NPC from "./NPC";

type Direction = "down" | "right" | "left" | "up";

type Drawing = {
  file: string;
  x: number;
  y: number;
};

const WORLD_WIDTH = 3000;
const WORLD_HEIGHT = 2000;

const CHARACTER_WIDTH = 100;
const CHARACTER_HEIGHT = 170;

export default function TestWorld() {
  /*
    ==============================
    PLAYER POSITION
    ==============================
  */

  const [position, setPosition] = useState({
    x: WORLD_WIDTH / 2,
    y: WORLD_HEIGHT / 2,
  });

  const [direction, setDirection] =
    useState<Direction>("down");

  const [frame, setFrame] = useState(0);

  /*
    ==============================
    DRAWINGS
    ==============================
  */

  const [drawings, setDrawings] =
    useState<Drawing[]>([]);

  /*
    ==============================
    PLAYER CONTROLS
    ==============================
  */

  const keys = useRef(new Set<string>());

  const directionRef =
    useRef<Direction>("down");

  const lastFrameTime = useRef(0);

  /*
    ==============================
    TOUCH DEVICE
    ==============================
  */

  const [isTouchDevice, setIsTouchDevice] =
    useState(false);

  /*
    ==============================
    WALKING AUDIO
    ==============================
  */

  const walkingAudio =
    useRef<HTMLAudioElement | null>(null);

  /*
    Create walking sound
  */

  useEffect(() => {
    const audio = new Audio(
      "/assets/museum/walking.mp3"
    );

    audio.loop = true;
    audio.volume = 1.0;

    walkingAudio.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
      walkingAudio.current = null;
    };
  }, []);

  /*
    ==============================
    DETECT TOUCH DEVICES
    ==============================
  */

  useEffect(() => {
    const checkTouchDevice = () => {
      const hasTouch =
        navigator.maxTouchPoints > 0 ||
        "ontouchstart" in window ||
        window.matchMedia(
          "(pointer: coarse)"
        ).matches;

      setIsTouchDevice(hasTouch);
    };

    checkTouchDevice();

    window.addEventListener(
      "resize",
      checkTouchDevice
    );

    return () => {
      window.removeEventListener(
        "resize",
        checkTouchDevice
      );
    };
  }, []);

  /*
    ==============================
    LOAD DRAWINGS
    ==============================
  */

  useEffect(() => {
    async function loadDrawings() {
      const response =
        await fetch("/api/drawings");

      const files: string[] =
        await response.json();

      const placedDrawings = files.map(
        (file) => ({
          file,

          x:
            Math.random() * 2700 +
            150,

          y:
            Math.random() * 1700 +
            150,
        })
      );

      setDrawings(placedDrawings);
    }

    loadDrawings();
  }, []);

  /*
    ==============================
    TOUCH BUTTON FUNCTIONS
    ==============================
  */

  const touchStart = (
    direction: string
  ) => {
    keys.current.add(direction);
  };

  const touchEnd = (
    direction: string
  ) => {
    keys.current.delete(direction);
  };

  /*
    ==============================
    CONTROLS
    ==============================
  */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      const key =
        event.key.toLowerCase();

      if (
        key === "w" ||
        key === "a" ||
        key === "s" ||
        key === "d" ||
        key === "arrowup" ||
        key === "arrowdown" ||
        key === "arrowleft" ||
        key === "arrowright"
      ) {
        event.preventDefault();

        keys.current.add(key);
      }
    };

    const handleKeyUp = (
      event: KeyboardEvent
    ) => {
      keys.current.delete(
        event.key.toLowerCase()
      );
    };

    let animationId: number;

    const gameLoop = (
      time: number
    ) => {
      const currentKeys =
        keys.current;

      let moving = false;

      let newDirection =
        directionRef.current;

      const speed = 4;

      /*
        ==============================
        LEFT
        ==============================
      */

      if (
        currentKeys.has("a") ||
        currentKeys.has("arrowleft")
      ) {
        newDirection = "left";
        moving = true;
      }

      /*
        ==============================
        RIGHT
        ==============================
      */

      else if (
        currentKeys.has("d") ||
        currentKeys.has("arrowright")
      ) {
        newDirection = "right";
        moving = true;
      }

      /*
        ==============================
        UP
        ==============================
      */

      else if (
        currentKeys.has("w") ||
        currentKeys.has("arrowup")
      ) {
        newDirection = "up";
        moving = true;
      }

      /*
        ==============================
        DOWN
        ==============================
      */

      else if (
        currentKeys.has("s") ||
        currentKeys.has("arrowdown")
      ) {
        newDirection = "down";
        moving = true;
      }

      /*
        ==============================
        PLAYER IS WALKING
        ==============================
      */

      if (moving) {
        directionRef.current =
          newDirection;

        setDirection(
          newDirection
        );

        /*
          Start walking sound
        */

        if (
          walkingAudio.current &&
          walkingAudio.current.paused
        ) {
          walkingAudio.current
            .play()
            .catch(() => {});
        }

        /*
          Move player
        */

        setPosition(
          (current) => {
            let x = current.x;
            let y = current.y;

            if (
              newDirection === "left"
            ) {
              x -= speed;
            }

            if (
              newDirection === "right"
            ) {
              x += speed;
            }

            if (
              newDirection === "up"
            ) {
              y -= speed;
            }

            if (
              newDirection === "down"
            ) {
              y += speed;
            }

            /*
              Keep character inside
              the world.
            */

            x = Math.max(
              CHARACTER_WIDTH / 2,
              Math.min(
                WORLD_WIDTH -
                  CHARACTER_WIDTH / 2,
                x
              )
            );

            y = Math.max(
              CHARACTER_HEIGHT / 2,
              Math.min(
                WORLD_HEIGHT -
                  CHARACTER_HEIGHT / 2,
                y
              )
            );

            return {
              x,
              y,
            };
          }
        );

        /*
          ==============================
          WALKING ANIMATION
          ==============================
        */

        if (
          time -
            lastFrameTime.current >=
          120
        ) {
          setFrame(
            (current) =>
              (current + 1) % 4
          );

          lastFrameTime.current =
            time;
        }
      } else {
        /*
          ==============================
          PLAYER IS NOT WALKING
          ==============================
        */

        /*
          Stop walking sound
        */

        if (
          walkingAudio.current &&
          !walkingAudio.current.paused
        ) {
          walkingAudio.current.pause();
        }

        /*
          Return to standing frame
        */

        setFrame(0);
      }

      animationId =
        requestAnimationFrame(
          gameLoop
        );
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    window.addEventListener(
      "keyup",
      handleKeyUp
    );

    animationId =
      requestAnimationFrame(
        gameLoop
      );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      window.removeEventListener(
        "keyup",
        handleKeyUp
      );

      cancelAnimationFrame(
        animationId
      );

      /*
        Make sure walking sound
        stops when leaving page.
      */

      if (walkingAudio.current) {
        walkingAudio.current.pause();
      }
    };
  }, []);

  /*
    ==============================
    SPRITE SHEET
    ==============================

    Row 0 = down
    Row 1 = left
    Row 2 = right
    Row 3 = up
  */

  const directionRow = {
    down: 0,
    left: 1,
    right: 2,
    up: 3,
  };

  const row =
    directionRow[direction];

  /*
    ==============================
    RENDER
    ==============================
  */

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        background: "#ddd",
        touchAction: "none",
      }}
    >

      {/* =====================================
          WORLD
          ===================================== */}

      <div
        style={{
          position: "absolute",

          width:
            `${WORLD_WIDTH}px`,

          height:
            `${WORLD_HEIGHT}px`,

          /*
            Place world origin at
            the center of the screen.
          */

          left: "50%",
          top: "50%",

          /*
            Camera follows player.
          */

          transform: `
            translate(
              -${position.x}px,
              -${position.y}px
            )
          `,
        }}
      >

        {/* =====================================
            BACKGROUND
            ===================================== */}

        <Image
          src="/assets/museum/museumbackground2.png"
          alt=""
          width={WORLD_WIDTH}
          height={WORLD_HEIGHT}
          priority
          style={{
            display: "block",
          }}
        />

        {/* =====================================
            DRAWINGS
            ===================================== */}

        {drawings.map(
          (drawing) => (
            <div
              key={drawing.file}
              style={{
                position:
                  "absolute",

                left:
                  drawing.x,

                top:
                  drawing.y,

                width:
                  "140px",

                height:
                  "180px",

                transform:
                  "translate(-50%, -50%)",

                zIndex: 5,
              }}
            >
              <Image
                src={`/assets/museum/drawings/${drawing.file}`}
                alt={
                  drawing.file
                }
                fill
                style={{
                  objectFit:
                    "contain",
                }}
              />
            </div>
          )
        )}

        {/* =====================================
            NPCs
            ===================================== */}

        <NPC
          startX={700}
          startY={600}
        />

        <NPC
          startX={1200}
          startY={1400}
        />

        <NPC
          startX={1900}
          startY={700}
        />

        <NPC
          startX={2400}
          startY={1400}
        />

      </div>

      {/* =====================================
          PLAYER
          ===================================== */}

      <div
        style={{
          position:
            "absolute",

          left: "50%",
          top: "50%",

          width:
            `${CHARACTER_WIDTH}px`,

          height:
            `${CHARACTER_HEIGHT}px`,

          transform:
            "translate(-50%, -50%)",

          backgroundImage:
            "url('/assets/museum/mycharacter1.png')",

          backgroundSize:
            "400px 680px",

          backgroundPosition: `
            -${frame * 100}px
            -${row * 170}px
          `,

          backgroundRepeat:
            "no-repeat",

          zIndex: 50,

          pointerEvents:
            "none",
        }}
      />

      {/* =====================================
          TOUCH CONTROLS
          ===================================== */}

      {isTouchDevice && (
        <>
          {/* =================================
              UP
              ================================= */}

          <button
            aria-label="Move up"

            onPointerDown={(event) => {
              event.preventDefault();

              event.currentTarget.setPointerCapture(
                event.pointerId
              );

              touchStart(
                "arrowup"
              );
            }}

            onPointerUp={(event) => {
              event.preventDefault();

              touchEnd(
                "arrowup"
              );
            }}

            onPointerCancel={() => {
              touchEnd(
                "arrowup"
              );
            }}

            style={{
              position: "fixed",

              top: "20px",
              left: "50%",

              transform:
                "translateX(-50%)",

              width: "70px",
              height: "70px",

              border: "none",
              borderRadius: "18px",

              background:
                "rgba(255, 255, 255, 0.75)",

              fontSize: "32px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              cursor: "pointer",

              userSelect: "none",
              WebkitUserSelect:
                "none",

              touchAction: "none",

              zIndex: 9999,
            }}
          >
            ▲
          </button>

          {/* =================================
              DOWN
              ================================= */}

          <button
            aria-label="Move down"

            onPointerDown={(event) => {
              event.preventDefault();

              event.currentTarget.setPointerCapture(
                event.pointerId
              );

              touchStart(
                "arrowdown"
              );
            }}

            onPointerUp={(event) => {
              event.preventDefault();

              touchEnd(
                "arrowdown"
              );
            }}

            onPointerCancel={() => {
              touchEnd(
                "arrowdown"
              );
            }}

            style={{
              position: "fixed",

              bottom: "20px",
              left: "50%",

              transform:
                "translateX(-50%)",

              width: "70px",
              height: "70px",

              border: "none",
              borderRadius: "18px",

              background:
                "rgba(255, 255, 255, 0.75)",

              fontSize: "32px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              cursor: "pointer",

              userSelect: "none",
              WebkitUserSelect:
                "none",

              touchAction: "none",

              zIndex: 9999,
            }}
          >
            ▼
          </button>

          {/* =================================
              LEFT
              ================================= */}

          <button
            aria-label="Move left"

            onPointerDown={(event) => {
              event.preventDefault();

              event.currentTarget.setPointerCapture(
                event.pointerId
              );

              touchStart(
                "arrowleft"
              );
            }}

            onPointerUp={(event) => {
              event.preventDefault();

              touchEnd(
                "arrowleft"
              );
            }}

            onPointerCancel={() => {
              touchEnd(
                "arrowleft"
              );
            }}

            style={{
              position: "fixed",

              left: "20px",
              top: "50%",

              transform:
                "translateY(-50%)",

              width: "70px",
              height: "70px",

              border: "none",
              borderRadius: "18px",

              background:
                "rgba(255, 255, 255, 0.75)",

              fontSize: "32px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              cursor: "pointer",

              userSelect: "none",
              WebkitUserSelect:
                "none",

              touchAction: "none",

              zIndex: 9999,
            }}
          >
            ◀
          </button>

          {/* =================================
              RIGHT
              ================================= */}

          <button
            aria-label="Move right"

            onPointerDown={(event) => {
              event.preventDefault();

              event.currentTarget.setPointerCapture(
                event.pointerId
              );

              touchStart(
                "arrowright"
              );
            }}

            onPointerUp={(event) => {
              event.preventDefault();

              touchEnd(
                "arrowright"
              );
            }}

            onPointerCancel={() => {
              touchEnd(
                "arrowright"
              );
            }}

            style={{
              position: "fixed",

              right: "20px",
              top: "50%",

              transform:
                "translateY(-50%)",

              width: "70px",
              height: "70px",

              border: "none",
              borderRadius: "18px",

              background:
                "rgba(255, 255, 255, 0.75)",

              fontSize: "32px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              cursor: "pointer",

              userSelect: "none",
              WebkitUserSelect:
                "none",

              touchAction: "none",

              zIndex: 9999,
            }}
          >
            ▶
          </button>
        </>
      )}

    </main>
  );
}
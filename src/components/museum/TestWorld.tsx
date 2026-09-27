"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import NPC from "./NPC";
import Elevator from "./Elevator";

type Direction =
  | "down"
  | "right"
  | "left"
  | "up";

/*
  =====================================
  MUSEUM IMAGE
  =====================================

  Original image dimensions:

  2048 × 1228

  We keep this exact ratio.
*/

const TILE_WIDTH = 4000 * 0.2;

const TILE_HEIGHT = 3772 * 0.2;

/*
  =====================================
  MUSEUM GRID
  =====================================
*/

const COLUMNS = 5;
const ROWS = 10;

/*
  Brown divider between floors.
*/

const FLOOR_BAR_HEIGHT = 100;

const FLOOR_POSITIONS = [
  (TILE_HEIGHT + FLOOR_BAR_HEIGHT) * 9 +
    TILE_HEIGHT / 2, // Floor 1

  (TILE_HEIGHT + FLOOR_BAR_HEIGHT) * 8 +
    TILE_HEIGHT / 2, // Floor 2

  (TILE_HEIGHT + FLOOR_BAR_HEIGHT) * 7 +
    TILE_HEIGHT / 2, // Floor 3

  (TILE_HEIGHT + FLOOR_BAR_HEIGHT) * 6 +
    TILE_HEIGHT / 2, // Floor 4

  (TILE_HEIGHT + FLOOR_BAR_HEIGHT) * 5 +
    TILE_HEIGHT / 2, // Floor 5

  (TILE_HEIGHT + FLOOR_BAR_HEIGHT) * 4 +
    TILE_HEIGHT / 2, // Floor 6

  (TILE_HEIGHT + FLOOR_BAR_HEIGHT) * 3 +
    TILE_HEIGHT / 2, // Floor 7

  (TILE_HEIGHT + FLOOR_BAR_HEIGHT) * 2 +
    TILE_HEIGHT / 2, // Floor 8

  (TILE_HEIGHT + FLOOR_BAR_HEIGHT) * 1 +
    TILE_HEIGHT / 2, // Floor 9

  TILE_HEIGHT / 2, // Floor 10
];

/*
  =====================================
  ELEVATOR
  =====================================
*/

const ELEVATOR_HEIGHT = TILE_HEIGHT * 0.85;

const ELEVATOR_WIDTH =
  ELEVATOR_HEIGHT * (392 / 466);

/*
  =====================================
  WORLD SIZE
  =====================================
*/

const ROOMS_WIDTH =
  TILE_WIDTH * COLUMNS;

/*
  There is now an elevator on BOTH sides
  of the museum rooms.

  LEFT ELEVATOR
  ↓
  5 ROOMS
  ↓
  RIGHT ELEVATOR
*/

const WORLD_WIDTH =
  ELEVATOR_WIDTH +
  ROOMS_WIDTH +
  ELEVATOR_WIDTH;

const WORLD_HEIGHT =
  TILE_HEIGHT * ROWS +
  FLOOR_BAR_HEIGHT *
    (ROWS - 1);

/*
  =====================================
  CHARACTER
  =====================================
*/

const CHARACTER_WIDTH = 200;
const CHARACTER_HEIGHT = 340;

/*
  =====================================
  ELEVATOR LOCATIONS
  =====================================
*/

/*
  Center of the LEFT elevator.
*/

const LEFT_ELEVATOR_X =
  ELEVATOR_WIDTH / 2;

/*
  Center of the RIGHT elevator.
*/

const RIGHT_ELEVATOR_X =
  ELEVATOR_WIDTH +
  ROOMS_WIDTH +
  ELEVATOR_WIDTH / 2;

/*
  Keep the old name available for the
  starting position.
*/

const ELEVATOR_X =
  LEFT_ELEVATOR_X;

/*
  =====================================
  COMPONENT
  =====================================
*/

export default function TestWorld() {
  /*
    =================================
    PLAYER POSITION
    =================================
  */

  const [position, setPosition] = useState({
    x:
      ELEVATOR_WIDTH +
      TILE_WIDTH / 4,

    y: FLOOR_POSITIONS[0],
  });

  const [cameraY, setCameraY] = useState(
    FLOOR_POSITIONS[0]
  );

  /*
    =================================
    ELEVATOR FLOOR
    =================================

    Both elevators share this value.

    When either elevator moves,
    both elevators move to this floor.
  */

  const [elevatorFloor, setElevatorFloor] =
    useState(1);

  /*
    =================================
    ACTIVE ELEVATOR
    =================================

    This remembers which elevator the
    player entered.

    That way, when the elevator arrives,
    the player is placed at the elevator
    they actually used.
  */

  const [activeElevatorX, setActiveElevatorX] =
    useState<number | null>(null);

  /*
    =================================
    PLAYER DIRECTION
    =================================
  */

  const [direction, setDirection] =
    useState<Direction>("down");

  /*
    =================================
    SPRITE FRAME
    =================================
  */

  const [frame, setFrame] =
    useState(0);

  /*
    =================================
    ARTWORK
    =================================
  */

  const [drawings, setDrawings] =
    useState<any[]>([]);

  /*
    =================================
    SELECTED ARTWORK
    =================================
  */

  const [selectedArtwork, setSelectedArtwork] =
    useState<any | null>(null);

  /*
    =================================
    CONTROLS
    =================================
  */

  const keys =
    useRef(new Set<string>());

  const directionRef =
    useRef<Direction>("down");

  const lastFrameTime =
    useRef(0);

  /*
    =================================
    WALKING AUDIO
    =================================
  */

  const walkingAudio =
    useRef<HTMLAudioElement | null>(
      null
    );

  useEffect(() => {
    const audio =
      new Audio(
        "/assets/museum/walking.mp3"
      );

    audio.loop = true;

    audio.volume = 1.0;

    walkingAudio.current =
      audio;

    return () => {
      audio.pause();

      audio.currentTime = 0;

      walkingAudio.current =
        null;
    };
  }, []);

  /*
    =================================
    LOAD ARTWORK
    =================================
  */

  useEffect(() => {
    async function loadDrawings() {
      try {
        const response =
          await fetch("/api/artworks");

        const artworks =
          await response.json();

        setDrawings(artworks);
      } catch (error) {
        console.error(
          "Could not load artwork:",
          error
        );
      }
    }

    loadDrawings();
  }, []);

  /*
    =================================
    FLOOR POSITION
    =================================
  */

  const getFloorY = (
    floor: number
  ) => {
    return (
      FLOOR_POSITIONS[floor - 1] ??
      FLOOR_POSITIONS[0]
    );
  };

  /*
    =================================
    FIND CURRENT ARTWORK
    =================================

    Artwork IDs are arranged:

    Bottom row:
    1  2  3  4  5

    Row 2:
    6  7  8  9  10

    ...

    Top row:
    46 47 48 49 50
  */

  const getCurrentArtwork = () => {
    /*
      LEFT ELEVATOR
    */

    if (
      position.x <
      ELEVATOR_WIDTH
    ) {
      return null;
    }

    /*
      RIGHT ELEVATOR
    */

    if (
      position.x >=
      ELEVATOR_WIDTH +
        ROOMS_WIDTH
    ) {
      return null;
    }

    /*
      COLUMN
    */

    const columnIndex =
      Math.floor(
        (position.x -
          ELEVATOR_WIDTH) /
          TILE_WIDTH
      );

    if (
      columnIndex < 0 ||
      columnIndex >= COLUMNS
    ) {
      return null;
    }

    /*
      VISUAL ROW

      0 = TOP
      1
      2
      ...
      9 = BOTTOM
    */

    const visualRow =
      Math.round(
        (
          position.y -
          TILE_HEIGHT / 2
        ) /
          (
            TILE_HEIGHT +
            FLOOR_BAR_HEIGHT
          )
      );

    if (
      visualRow < 0 ||
      visualRow >= ROWS
    ) {
      return null;
    }

    /*
      Convert visual row into
      artwork row.

      Bottom = 0
      Top = 9
    */

    const artworkRow =
      ROWS - 1 - visualRow;

    /*
      Calculate artwork index.
    */

    const artworkIndex =
      artworkRow *
        COLUMNS +
      columnIndex;

    return (
      drawings[artworkIndex] ||
      null
    );
  };

  /*
    =================================
    SHOW ARTWORK METADATA
    =================================
  */

  const handleUpButton = () => {
    const artwork =
      getCurrentArtwork();

    if (artwork) {
      setSelectedArtwork(
        artwork
      );

      return;
    }

    keys.current.add(
      "arrowup"
    );
  };

  /*
    =================================
    KEYBOARD CONTROLS
    =================================
  */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      const key =
        event.key.toLowerCase();

      /*
        Arrow Up opens artwork
        metadata when standing
        inside an artwork room.
      */

      if (
        key === "arrowup"
      ) {
        const artwork =
          getCurrentArtwork();

        if (artwork) {
          event.preventDefault();

          setSelectedArtwork(
            artwork
          );

          keys.current.delete(
            "arrowup"
          );

          return;
        }
      }

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

      const speed = 6;

      /*
        LEFT
      */

      if (
        currentKeys.has("a") ||
        currentKeys.has(
          "arrowleft"
        )
      ) {
        newDirection = "left";

        moving = true;
      }

      /*
        RIGHT
      */

      else if (
        currentKeys.has("d") ||
        currentKeys.has(
          "arrowright"
        )
      ) {
        newDirection = "right";

        moving = true;
      }

      /*
        MOVING
      */

      if (moving) {
        directionRef.current =
          newDirection;

        setDirection(
          newDirection
        );

        /*
          Walking sound
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
          Move character
        */

        setPosition(
          (current) => {
            let x =
              current.x;

            let y =
              current.y;

            if (
              newDirection ===
              "left"
            ) {
              x -= speed;
            }

            if (
              newDirection ===
              "right"
            ) {
              x += speed;
            }

            /*
              Keep character
              inside world.
            */

            x = Math.max(
              CHARACTER_WIDTH /
                2,

              Math.min(
                WORLD_WIDTH -
                  CHARACTER_WIDTH /
                    2,

                x
              )
            );

            y = Math.max(
              CHARACTER_HEIGHT /
                2,

              Math.min(
                WORLD_HEIGHT -
                  CHARACTER_HEIGHT /
                    2,

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
          Animation
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
      }

      /*
        NOT MOVING
      */

      else {
        if (
          walkingAudio.current &&
          !walkingAudio.current.paused
        ) {
          walkingAudio.current.pause();
        }

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

      if (
        walkingAudio.current
      ) {
        walkingAudio.current.pause();
      }
    };
  }, [position, drawings]);

  /*
    =================================
    SPRITE SHEET
    =================================
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
    =================================
    ENTER FLOOR
    =================================
  */

  const goToFloor = (
    floor: number,
    elevatorX: number
  ) => {
    const floorY =
      getFloorY(floor);

    setActiveElevatorX(
      elevatorX
    );

    setElevatorFloor(
      floor
    );

    setPosition({
      x: elevatorX,

      y: floorY,
    });

    if (
      elevatorX ===
      LEFT_ELEVATOR_X
    ) {
      setDirection("right");

      directionRef.current =
        "right";
    } else {
      setDirection("left");

      directionRef.current =
        "left";
    }

    if (
      walkingAudio.current
    ) {
      walkingAudio.current.pause();
    }
  };

  /*
    =================================
    RENDER
    =================================
  */

  return (
    <main
      style={{
        width: "100vw",

        height: "100vh",

        overflow: "hidden",

        position: "relative",

        background: "#000000",

        touchAction: "none",
      }}
    >
      {/* =================================
          WORLD
          ================================= */}

      <div
        style={{
          position: "absolute",

          width:
            `${WORLD_WIDTH}px`,

          height:
            `${WORLD_HEIGHT}px`,

          left: "50%",

          top: "50%",

          transform: `
            translate(
              -${position.x}px,
              -${cameraY}px
            )
          `,
        }}
      >
        {/* =================================
            MUSEUM FLOORS
            ================================= */}

        {Array.from({
          length: ROWS,
        }).map((_, floorIndex) => {
          const floorY =
            floorIndex *
              (
                TILE_HEIGHT +
                FLOOR_BAR_HEIGHT
              );

          return (
            <div
              key={
                `floor-${floorIndex}`
              }
              style={{
                position:
                  "absolute",

                left:
                  `${ELEVATOR_WIDTH}px`,

                top:
                  `${floorY}px`,

                width:
                  `${ROOMS_WIDTH}px`,

                height:
                  `${TILE_HEIGHT}px`,

                display: "flex",

                gap: 0,
              }}
            >
              {/* =================================
                  FIVE TOUCHING MUSEUM IMAGES
                  ================================= */}

              {Array.from({
                length: COLUMNS,
              }).map(
                (_, columnIndex) => {
                  /*
                    Bottom floor gets
                    artwork IDs 1–5.

                    Top floor gets
                    artwork IDs 46–50.
                  */

                  const artworkRow =
                    ROWS -
                    1 -
                    floorIndex;

                  const artworkIndex =
                    artworkRow *
                      COLUMNS +
                    columnIndex;

                  const artwork =
                    drawings[
                      artworkIndex
                    ];

                  return (
                    <div
                      key={
                        `floor-${floorIndex}-room-${columnIndex}`
                      }
                      style={{
                        position:
                          "relative",

                        width:
                          `${TILE_WIDTH}px`,

                        height:
                          `${TILE_HEIGHT}px`,

                        flexShrink: 0,

                        margin: 0,

                        padding: 0,

                        overflow:
                          "hidden",
                      }}
                    >
                      {/* =================================
                          MUSEUM ROOM BACKGROUND
                          ================================= */}

                      <Image
                        src="/assets/museum/museumlayout9.png"
                        alt="Museum room"
                        fill
                        priority={
                          floorIndex ===
                            9 &&
                          columnIndex ===
                            0
                        }
                        sizes={`${TILE_WIDTH}px`}
                        style={{
                          objectFit:
                            "fill",

                          display:
                            "block",

                          zIndex: 1,
                        }}
                      />

                      {/* =================================
                          ARTWORK
                          ================================= */}

                      {artwork && (
                        <Image
                          src={
                            artwork.image
                          }
                          alt={
                            artwork.title
                          }
                          width={500}
                          height={500}
                          style={{
                            position:
                              "absolute",

                            left:
                              "50.5%",

                            top:
                              "35%",

                            transform:
                              "translate(-50%, -50%)",

                            width:
                              "380px",

                            height:
                              "380px",

                            objectFit:
                              "contain",

                            zIndex: 10,
                          }}
                        />
                      )}
                    </div>
                  );
                }
              )}

              {/* =================================
                  BROWN FLOOR BAR
                  ================================= */}

              {floorIndex <
                ROWS - 1 && (
                <div
                  style={{
                    position:
                      "absolute",

                    left: 0,

                    top:
                      `${TILE_HEIGHT}px`,

                    width:
                      `${ROOMS_WIDTH}px`,

                    height:
                      `${FLOOR_BAR_HEIGHT}px`,

                    background:
                      "#6b4226",

                    zIndex: 5,
                  }}
                />
              )}
            </div>
          );
        })}

        {/* =================================
            LEFT ELEVATOR
            ================================= */}

        <Elevator
          x={
            LEFT_ELEVATOR_X
          }
          y={
            FLOOR_POSITIONS[0]
          }
          width={
            ELEVATOR_WIDTH
          }
          height={
            ELEVATOR_HEIGHT
          }
          characterX={
            position.x
          }
          characterY={
            position.y
          }
          floorPositions={
            FLOOR_POSITIONS
          }
          targetFloor={
            elevatorFloor
          }
          onFloorSelect={(
            floor
          ) => {
            setElevatorFloor(
              floor
            );
          }}
          onEnterElevator={() => {
            setActiveElevatorX(
              LEFT_ELEVATOR_X
            );

            setPosition(
              (current) => ({
                ...current,
                x:
                  LEFT_ELEVATOR_X,
              })
            );
          }}
          onElevatorMove={(
            newY
          ) => {
            setCameraY(newY);
          }}
          onFloorReached={(
            floor
          ) => {
            const targetY =
              FLOOR_POSITIONS[
                floor - 1
              ];

            if (
              activeElevatorX ===
              LEFT_ELEVATOR_X
            ) {
              setPosition(
                (current) => ({
                  ...current,
                  x:
                    LEFT_ELEVATOR_X,
                  y: targetY,
                })
              );
            }

            setCameraY(
              targetY
            );

            console.log(
              `Arrived at floor ${floor}`
            );
          }}
        />

        {/* =================================
            RIGHT ELEVATOR
            ================================= */}

        <Elevator
          x={
            RIGHT_ELEVATOR_X
          }
          y={
            FLOOR_POSITIONS[0]
          }
          width={
            ELEVATOR_WIDTH
          }
          height={
            ELEVATOR_HEIGHT
          }
          characterX={
            position.x
          }
          characterY={
            position.y
          }
          floorPositions={
            FLOOR_POSITIONS
          }
          targetFloor={
            elevatorFloor
          }
          onFloorSelect={(
            floor
          ) => {
            setElevatorFloor(
              floor
            );
          }}
          onEnterElevator={() => {
            setActiveElevatorX(
              RIGHT_ELEVATOR_X
            );

            setPosition(
              (current) => ({
                ...current,
                x:
                  RIGHT_ELEVATOR_X,
              })
            );
          }}
          onElevatorMove={(
            newY
          ) => {
            setCameraY(newY);
          }}
          onFloorReached={(
            floor
          ) => {
            const targetY =
              FLOOR_POSITIONS[
                floor - 1
              ];

            if (
              activeElevatorX ===
              RIGHT_ELEVATOR_X
            ) {
              setPosition(
                (current) => ({
                  ...current,
                  x:
                    RIGHT_ELEVATOR_X,
                  y: targetY,
                })
              );
            }

            setCameraY(
              targetY
            );

            console.log(
              `Arrived at floor ${floor}`
            );
          }}
        />
      </div>

      {/* =================================
          PLAYER
          ================================= */}

      <div
        style={{
          position: "absolute",

          left: "50%",

          top: "71%",

          width:
            `${CHARACTER_WIDTH}px`,

          height:
            `${CHARACTER_HEIGHT}px`,

          transform:
            "translate(-50%, -50%)",

          backgroundImage:
            "url('/assets/museum/mycharacter1.png')",

          backgroundSize:
            "800px 1360px",

          backgroundPosition: `
            -${frame * 200}px
            -${row * 340}px
          `,

          backgroundRepeat:
            "no-repeat",

          zIndex: 50,

          pointerEvents:
            "none",
        }}
      />

      {/* =================================
          ARTWORK METADATA
          ================================= */}

      {selectedArtwork && (
        <div
          style={{
            position: "fixed",

            inset: 0,

            zIndex: 20000,

            background:
              "rgba(0,0,0,0.65)",

            display: "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            padding: "30px",
          }}
        >
          <div
            style={{
              position:
                "relative",

              width:
                "min(800px, 90vw)",

              maxHeight:
                "90vh",

              overflowY:
                "auto",

              background:
                "#ffffff",

              borderRadius:
                "20px",

              padding:
                "30px",

              boxSizing:
                "border-box",

              color:
                "#222222",
            }}
          >
            {/* CLOSE BUTTON */}

            <button
              onClick={() =>
                setSelectedArtwork(
                  null
                )
              }
              style={{
                position:
                  "absolute",

                right:
                  "15px",

                top:
                  "15px",

                width:
                  "45px",

                height:
                  "45px",

                border:
                  "none",

                borderRadius:
                  "50%",

                background:
                  "#eeeeee",

                fontSize:
                  "24px",

                cursor:
                  "pointer",

                zIndex: 2,
              }}
            >
              ×
            </button>

            {/* ARTWORK IMAGE */}

            <div
              style={{
                width:
                  "100%",

                display:
                  "flex",

                justifyContent:
                  "center",

                marginBottom:
                  "25px",
              }}
            >
              <Image
                src={
                  selectedArtwork.image
                }
                alt={
                  selectedArtwork.title
                }
                width={600}
                height={600}
                style={{
                  width:
                    "min(600px, 100%)",

                  height:
                    "auto",

                  objectFit:
                    "contain",

                  borderRadius:
                    "10px",
                }}
              />
            </div>

            {/* TITLE */}

            <h2
              style={{
                margin:
                  "0 0 15px",

                fontSize:
                  "32px",
              }}
            >
              {
                selectedArtwork.title
              }
            </h2>

            {/* YEAR */}

            {selectedArtwork.year && (
              <p
                style={{
                  margin:
                    "8px 0",
                }}
              >
                <strong>
                  Year:
                </strong>{" "}
                {
                  selectedArtwork.year
                }
              </p>
            )}

            {/* LOCATION */}

            {selectedArtwork.location && (
              <p
                style={{
                  margin:
                    "8px 0",
                }}
              >
                <strong>
                  Location:
                </strong>{" "}
                {
                  selectedArtwork.location
                }
              </p>
            )}

            {/* DESCRIPTION */}

            {selectedArtwork.description && (
              <p
                style={{
                  margin:
                    "20px 0 0",

                  lineHeight:
                    "1.6",

                  fontSize:
                    "17px",
                }}
              >
                {
                  selectedArtwork.description
                }
              </p>
            )}
          </div>
        </div>
      )}

      {/* =================================
          MOBILE CONTROLS
          ================================= */}

      <div
        style={{
          position: "fixed",

          right:
            "max(16px, env(safe-area-inset-right))",

          bottom:
            "max(16px, env(safe-area-inset-bottom))",

          width:
            "clamp(160px, 34vw, 220px)",

          height:
            "clamp(160px, 34vw, 220px)",

          zIndex: 9999,

          touchAction:
            "none",

          userSelect:
            "none",

          WebkitUserSelect:
            "none",
        }}
      >
        {/* UP */}

        <button
          aria-label="Move up"
         onPointerDown={(event) => {
  event.preventDefault();

  event.currentTarget.setPointerCapture(
    event.pointerId
  );

  if (selectedArtwork) {
    return;
  }

  keys.current.add("arrowup");
}}
          onPointerUp={(
            event
          ) => {
            event.preventDefault();

            keys.current.delete(
              "arrowup"
            );
          }}
          onPointerCancel={() =>
            keys.current.delete(
              "arrowup"
            )
          }
          onPointerLeave={() =>
            keys.current.delete(
              "arrowup"
            )
          }
          onLostPointerCapture={() =>
            keys.current.delete(
              "arrowup"
            )
          }
          style={{
            position:
              "absolute",

            left: "50%",

            top: 0,

            transform:
              "translateX(-50%)",

            width:
              "clamp(52px, 12vw, 70px)",

            height:
              "clamp(52px, 12vw, 70px)",

            border: "none",

            borderRadius:
              "14px",

            background:
              "rgba(255,255,255,0.8)",

            fontSize:
              "clamp(22px, 5vw, 32px)",

            display: "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            cursor: "pointer",

            padding: 0,

            touchAction:
              "none",

            userSelect:
              "none",

            WebkitUserSelect:
              "none",

            WebkitTapHighlightColor:
              "transparent",
          }}
        >
          ▲
        </button>

        {/* LEFT */}

        <button
          aria-label="Move left"
          onPointerDown={(
            event
          ) => {
            event.preventDefault();

            event.currentTarget.setPointerCapture(
              event.pointerId
            );

            keys.current.add(
              "arrowleft"
            );
          }}
          onPointerUp={(
            event
          ) => {
            event.preventDefault();

            keys.current.delete(
              "arrowleft"
            );
          }}
          onPointerCancel={() =>
            keys.current.delete(
              "arrowleft"
            )
          }
          onPointerLeave={() =>
            keys.current.delete(
              "arrowleft"
            )
          }
          onLostPointerCapture={() =>
            keys.current.delete(
              "arrowleft"
            )
          }
          style={{
            position:
              "absolute",

            left: 0,

            top: "50%",

            transform:
              "translateY(-50%)",

            width:
              "clamp(52px, 12vw, 70px)",

            height:
              "clamp(52px, 12vw, 70px)",

            border: "none",

            borderRadius:
              "14px",

            background:
              "rgba(255,255,255,0.8)",

            fontSize:
              "clamp(22px, 5vw, 32px)",

            display: "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            cursor:
              "pointer",

            padding: 0,

            touchAction:
              "none",

            userSelect:
              "none",

            WebkitUserSelect:
              "none",

            WebkitTapHighlightColor:
              "transparent",
          }}
        >
          ◀
        </button>

        {/* RIGHT */}

        <button
          aria-label="Move right"
          onPointerDown={(
            event
          ) => {
            event.preventDefault();

            event.currentTarget.setPointerCapture(
              event.pointerId
            );

            keys.current.add(
              "arrowright"
            );
          }}
          onPointerUp={(
            event
          ) => {
            event.preventDefault();

            keys.current.delete(
              "arrowright"
            );
          }}
          onPointerCancel={() =>
            keys.current.delete(
              "arrowright"
            )
          }
          onPointerLeave={() =>
            keys.current.delete(
              "arrowright"
            )
          }
          onLostPointerCapture={() =>
            keys.current.delete(
              "arrowright"
            )
          }
          style={{
            position:
              "absolute",

            right: 0,

            top: "50%",

            transform:
              "translateY(-50%)",

            width:
              "clamp(52px, 12vw, 70px)",

            height:
              "clamp(52px, 12vw, 70px)",

            border: "none",

            borderRadius:
              "14px",

            background:
              "rgba(255,255,255,0.8)",

            fontSize:
              "clamp(22px, 5vw, 32px)",

            display: "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            cursor:
              "pointer",

            padding: 0,

            touchAction:
              "none",

            userSelect:
              "none",

            WebkitUserSelect:
              "none",

            WebkitTapHighlightColor:
              "transparent",
          }}
        >
          ▶
        </button>

        {/* DOWN */}

        <button
          aria-label="Move down"
         onPointerDown={(event) => {
  event.preventDefault();

  event.currentTarget.setPointerCapture(
    event.pointerId
  );

  if (selectedArtwork) {
    setSelectedArtwork(null);
    return;
  }

  keys.current.add("arrowdown");
}}
          onPointerUp={(
            event
          ) => {
            event.preventDefault();

            keys.current.delete(
              "arrowdown"
            );
          }}
          onPointerCancel={() =>
            keys.current.delete(
              "arrowdown"
            )
          }
          onPointerLeave={() =>
            keys.current.delete(
              "arrowdown"
            )
          }
          onLostPointerCapture={() =>
            keys.current.delete(
              "arrowdown"
            )
          }
          style={{
            position:
              "absolute",

            left: "50%",

            bottom: 0,

            transform:
              "translateX(-50%)",

            width:
              "clamp(52px, 12vw, 70px)",

            height:
              "clamp(52px, 12vw, 70px)",

            border: "none",

            borderRadius:
              "14px",

            background:
              "rgba(255,255,255,0.8)",

            fontSize:
              "clamp(22px, 5vw, 32px)",

            display: "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            cursor:
              "pointer",

            padding: 0,

            touchAction:
              "none",

            userSelect:
              "none",

            WebkitUserSelect:
              "none",

            WebkitTapHighlightColor:
              "transparent",
          }}
        >
          ▼
        </button>
      </div>
    </main>
  );
}
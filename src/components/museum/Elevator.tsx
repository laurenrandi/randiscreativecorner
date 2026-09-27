"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ElevatorProps = {
  x: number;
  y: number;
  width: number;
  height: number;

  characterX: number;
  characterY: number;

  floorPositions: number[];

  /*
    NEW:

    The parent controls the floor.

    Both elevators receive the exact
    same targetFloor.
  */
  targetFloor: number;

  /*
    NEW:

    When a floor is selected from
    either elevator, tell the parent.
  */
  onFloorSelect: (
    floor: number
  ) => void;

  onElevatorMove: (
    newY: number
  ) => void;

  onEnterElevator: () => void;

  onFloorReached: (
    floor: number
  ) => void;
};

export default function Elevator({
  x,
  y,
  width,
  height,
  characterX,
  characterY,
  floorPositions,
  targetFloor,
  onFloorSelect,
  onElevatorMove,
  onEnterElevator,
  onFloorReached,
}: ElevatorProps) {
  const [showPanel, setShowPanel] =
    useState(false);
const [floorInput, setFloorInput] = useState("");
  const [mounted, setMounted] =
    useState(false);

  /*
   * This elevator's actual WORLD Y
   * position.
   */

  const [currentY, setCurrentY] =
    useState(y);

  /*
   * Whether this elevator is
   * currently moving.
   */

  const [isMoving, setIsMoving] =
    useState(false);

  /*
   * Ref gives the animation an exact
   * position without depending on
   * React state timing.
   */

  const currentYRef =
    useRef(y);

  const animationFrameRef =
    useRef<number | null>(
      null
    );

  /*
   * Remember the last target so
   * we don't restart an animation
   * unnecessarily.
   */

  const lastTargetFloorRef =
    useRef(1);

  /*
   * Mount portal.
   */

  useEffect(() => {
    setMounted(true);
  }, []);

  /*
   * Clean up animation.
   */

  useEffect(() => {
    return () => {
      if (
        animationFrameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }
    };
  }, []);

  /*
   * =================================
   * SYNCHRONIZED ELEVATOR MOVEMENT
   * =================================

   * The parent owns targetFloor.

   * Both elevator components receive
   * the same targetFloor.

   * Therefore, when either elevator
   * selects a floor, BOTH elevators
   * animate to it.
   */

  useEffect(() => {
    const targetIndex =
      targetFloor - 1;

    if (
      targetIndex < 0 ||
      targetIndex >=
        floorPositions.length
    ) {
      return;
    }

    /*
     * Don't restart the animation
     * if this is already our target.
     */

    if (
      lastTargetFloorRef.current ===
        targetFloor &&
      Math.abs(
        currentYRef.current -
          floorPositions[targetIndex]
      ) < 1
    ) {
      return;
    }

    lastTargetFloorRef.current =
      targetFloor;

    const targetY =
      floorPositions[targetIndex];

    /*
     * Already there.
     */

    if (
      Math.abs(
        targetY -
          currentYRef.current
      ) < 1
    ) {
      currentYRef.current =
        targetY;

      setCurrentY(
        targetY
      );

      onElevatorMove(
        targetY
      );

      return;
    }

    /*
     * Start movement.
     */

    setIsMoving(true);

    setShowPanel(false);

    const speed = 8;

    const animate = () => {
      const current =
        currentYRef.current;

      const difference =
        targetY -
        current;

      /*
       * ==============================
       * ARRIVED
       * ==============================
       */

      if (
        Math.abs(
          difference
        ) <= speed
      ) {
        currentYRef.current =
          targetY;

        setCurrentY(
          targetY
        );

        /*
         * Camera gets the exact same
         * world position.
         */

        onElevatorMove(
          targetY
        );

        setIsMoving(
          false
        );

        /*
         * Tell the parent that this
         * elevator has arrived.
         */

        onFloorReached(
          targetFloor
        );

        animationFrameRef.current =
          null;

        return;
      }

      /*
       * ==============================
       * MOVING
       * ==============================
       */

      const direction =
        difference > 0
          ? 1
          : -1;

      const nextY =
        current +
        direction *
          speed;

      currentYRef.current =
        nextY;

      setCurrentY(
        nextY
      );

      /*
       * Update camera.
       */

      onElevatorMove(
        nextY
      );

      /*
       * Continue animation.
       */

      animationFrameRef.current =
        requestAnimationFrame(
          animate
        );
    };

    /*
     * Cancel any previous animation.
     */

    if (
      animationFrameRef.current !==
      null
    ) {
      cancelAnimationFrame(
        animationFrameRef.current
      );
    }

    animationFrameRef.current =
      requestAnimationFrame(
        animate
      );

    return () => {
      if (
        animationFrameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );

        animationFrameRef.current =
          null;
      }
    };
  }, [
    targetFloor,
    floorPositions,
    onElevatorMove,
    onFloorReached,
  ]);

  /*
   * =================================
   * DISTANCE TO PLAYER
   * =================================
   */

  const distance = Math.sqrt(
    Math.pow(
      characterX - x,
      2
    ) +
      Math.pow(
        characterY -
          currentY,
        2
      )
  );

  const interactionDistance =
    250;

  const isNearby =
    distance <=
    interactionDistance;

  /*
   * Elevator stays open while:

   * - character is nearby
   * - elevator is moving
   */

  const isOpen =
    isNearby ||
    isMoving;

  /*
   * =================================
   * ARROW UP ENTERS ELEVATOR
   * =================================
   */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key ===
          "ArrowUp" &&
        isNearby &&
        !showPanel &&
        !isMoving
      ) {
        event.preventDefault();

        onEnterElevator();

        setShowPanel(true);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    isNearby,
    showPanel,
    isMoving,
    onEnterElevator,
  ]);

  /*
   * =================================
   * SELECT FLOOR
   * =================================
   */

  const handleFloorClick = (
    floor: number
  ) => {
    const targetIndex =
      floor - 1;

    if (
      targetIndex < 0 ||
      targetIndex >=
        floorPositions.length
    ) {
      return;
    }

    /*
     * Close this elevator's panel.
     */

    setShowPanel(false);

    /*
     * Tell TestWorld which floor
     * was selected.

     * TestWorld then updates the
     * shared targetFloor.

     * BOTH elevators receive that
     * new targetFloor.
     */

    onFloorSelect(
      floor
    );
  };

  return (
    <>
      {/* =================================
          ELEVATOR
          ================================= */}

      <div
        style={{
          position: "absolute",

          left:
            `${x}px`,

          top:
            `${currentY}px`,

          width:
            `${width}px`,

          height:
            `${height}px`,

          transform:
            "translate(-50%, -50%)",

          zIndex: 20,
        }}
      >
        {/* Brown rectangle underneath */}

        <div
          style={{
            position:
              "absolute",

            left: 0,

            bottom: -56,

            width: "100%",

            height: "15%",

            background:
              "#5b3a29",

            zIndex: 3,
          }}
        />

        {/* Elevator image */}

        <Image
          src={
            isOpen
              ? "/assets/museum/elevator/elevatoropen.jpg"
              : "/assets/museum/elevator/elevatorclosed.jpg"
          }
          alt="Museum elevator"
          fill
          priority
          sizes={`${width}px`}
          style={{
            objectFit:
              "contain",

            display:
              "block",

            zIndex: 2,
          }}
        />
      </div>

      {/* =================================
          FLOOR SELECTION PANEL
          ================================= */}

      {mounted &&
        showPanel &&
        !isMoving &&
        createPortal(
          <div
            style={{
              position:
                "fixed",

              inset: 0,

              display:
                "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              background:
                "rgba(0,0,0,0.45)",

              zIndex:
                99999,
            }}
          >
            <div
              style={{
                width:
                  "min(320px, 85vw)",

                padding:
                  "25px",

                background:
                  "#f5f0e8",

                border:
                  "6px solid #5b3a29",

                borderRadius:
                  "14px",

                boxShadow:
                  "0 15px 50px rgba(0,0,0,0.5)",
              }}
            >
              <h2
                style={{
                  margin:
                    "0 0 20px 0",

                  textAlign:
                    "center",

                  color:
                    "#3d281d",

                  fontSize:
                    "24px",
                }}
              >
                Choose a Floor
              </h2>

              <div
                style={{
                  display:
                    "grid",

                  gridTemplateColumns:
                    "repeat(3, 1fr)",

                  gap:
                    "10px",
                }}
              >
                {Array.from(
                  {
                    length:
                      floorPositions.length,
                  },
                  (_, index) => {
                    const floor =
                      index + 1;

                    return (
                      <button
                        key={
                          floor
                        }
                        onClick={() =>
                          handleFloorClick(
                            floor
                          )
                        }
                        style={{
                          height:
                            "55px",

                          border:
                            "2px solid #5b3a29",

                          borderRadius:
                            "7px",

                          background:
                            "#ffffff",

                          color:
                            "#3d281d",

                          fontSize:
                            "20px",

                          fontWeight:
                            "bold",

                          cursor:
                            "pointer",
                        }}
                      >
                        {floor}
                      </button>
                    );
                  }
                )}
              </div>

              <button
                onClick={() =>
                  setShowPanel(
                    false
                  )
                }
                style={{
                  width:
                    "100%",

                  marginTop:
                    "18px",

                  padding:
                    "11px",

                  border:
                    "none",

                  borderRadius:
                    "7px",

                  background:
                    "#5b3a29",

                  color:
                    "#ffffff",

                  fontSize:
                    "16px",

                  cursor:
                    "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
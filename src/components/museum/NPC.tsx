"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "down" | "right" | "left" | "up";

type NPCProps = {
  startX: number;
  startY: number;
};

export default function NPC({ startX, startY }: NPCProps) {
  /*
    This is the NPC's actual position in the WORLD.

    It does NOT depend on the camera or the player's position.
  */
  const position = useRef({
    x: startX,
    y: startY,
  });

  /*
    The location the NPC is currently walking toward.
  */
  const target = useRef({
    x: startX,
    y: startY,
  });

  /*
    Which direction the NPC is facing.
  */
  const direction = useRef<Direction>("down");

  /*
    React state used only to display the NPC.
  */
  const [renderPosition, setRenderPosition] = useState({
    x: startX,
    y: startY,
  });

  const [renderDirection, setRenderDirection] =
    useState<Direction>("down");

  const [frame, setFrame] = useState(0);

  /*
    Used for walking animation timing.
  */
  const lastFrameTime = useRef(0);

  /*
    Used to make the NPC pause after reaching a destination.
  */
  const nextDecisionTime = useRef(0);

  useEffect(() => {
    let animationId: number;

    /*
      Pick a random location somewhere in the WORLD.
      
      Your new world is 4500 x 3214,
      so we keep the NPC away from the edges.
    */
    const chooseTarget = () => {
      target.current = {
        x: Math.random() * 4100 + 200,
        y: Math.random() * 2814 + 200,
      };
    };

    /*
      Give the NPC its first destination.
    */
    chooseTarget();

    const gameLoop = (time: number) => {
      const current = position.current;
      const destination = target.current;

      const dx = destination.x - current.x;
      const dy = destination.y - current.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      /*
        The NPC reached its destination.
      */
      if (distance < 5) {
        /*
          Stop the walking animation.
        */
        setFrame(0);

        /*
          Wait somewhere between 1.5 and 4 seconds
          before choosing another destination.
        */
        if (time >= nextDecisionTime.current) {
          nextDecisionTime.current =
            time + 1500 + Math.random() * 2500;

          chooseTarget();
        }
      } else {
        /*
          NPC walking speed.

          This is intentionally slower than the player.
        */
        const speed = 1.2;

        current.x += (dx / distance) * speed;
        current.y += (dy / distance) * speed;

        /*
          Determine which direction the NPC is facing.
        */
        let newDirection: Direction;

        if (Math.abs(dx) > Math.abs(dy)) {
          newDirection = dx > 0 ? "right" : "left";
        } else {
          newDirection = dy > 0 ? "down" : "up";
        }

        /*
          Only update React when the direction changes.
        */
        if (direction.current !== newDirection) {
          direction.current = newDirection;
          setRenderDirection(newDirection);
        }

        /*
          Walking animation.
          
          The sprite sheet has 4 frames per direction.
        */
        if (time - lastFrameTime.current >= 180) {
          setFrame(
            (currentFrame) => (currentFrame + 1) % 4
          );

          lastFrameTime.current = time;
        }
      }

      /*
        IMPORTANT:

        This position is WORLD position.

        The camera does not control this.
        The player does not control this.

        The entire world moves underneath the NPC
        when the camera moves.
      */
      setRenderPosition({
        x: current.x,
        y: current.y,
      });

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  /*
    Sprite sheet:

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

  const row = directionRow[renderDirection];

  return (
    <div
      style={{
        /*
          NPC is positioned inside the WORLD.
        */
        position: "absolute",

        left: renderPosition.x,
        top: renderPosition.y,

        /*
          Display size of one character frame.
        */
        width: "100px",
        height: "170px",

        transform: "translate(-50%, -50%)",

        /*
          Your sprite sheet.
        */
        backgroundImage:
          "url('/assets/museum/mycharacter1.png')",

        /*
          Original sprite sheet:
          4 columns × 4 rows

          Displayed at:
          400 × 680

          Each frame therefore becomes:
          100 × 170
        */
        backgroundSize: "400px 680px",

        /*
          Select the correct frame.
        */
        backgroundPosition: `
          -${frame * 100}px
          -${row * 170}px
        `,

        backgroundRepeat: "no-repeat",

        /*
          Make the NPC a black silhouette.
        */
        filter: "brightness(0)",

        opacity: 0.8,

        zIndex: 8,

        pointerEvents: "none",
      }}
    />
  );
}
"use client";
import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function Typing({
  strings,
  typeSpeed,
  backSpeed,
  loop,
  size,
}: {
  strings: string[];
  typeSpeed: number;
  backSpeed: number;
  loop: boolean;
  size: string;
}) {
  const textRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const typed = new Typed("#text", {
      strings: strings,
      typeSpeed: typeSpeed,
      backSpeed: backSpeed,
      loop: loop,
    });

    return () => {
      typed.destroy();
    };
  }, [strings]);

  return (
    <div className={`text-${size} font-roboto font-bold`}>
      <span id="text" ref={textRef}></span>
    </div>
  );
}

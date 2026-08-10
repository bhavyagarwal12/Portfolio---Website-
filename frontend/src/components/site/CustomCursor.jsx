import { useEffect, useRef, useState } from "react";

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    // only enable on devices with a fine pointer (mouse)
    if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      const t = e.target;
      const interactive = t.closest(
        "a, button, input, textarea, select, [role='button'], .cursor-pointer"
      );
      setHovering(!!interactive);
    };
    const downH = () => setDown(true);
    const upH = () => setDown(false);
    const leave = () => {
      pos.current = { x: -100, y: -100 };
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", downH);
    window.addEventListener("mouseup", upH);
    document.addEventListener("mouseleave", leave);

    let raf;
    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18;
      ring.current.y += (pos.current.y - ring.current.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", downH);
      window.removeEventListener("mouseup", upH);
      document.removeEventListener("mouseleave", leave);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[#E8E4FF] mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-[#7C5CFC] transition-[width,height,opacity,background-color,border-color] duration-200 ease-out"
        style={{
          width: hovering ? 52 : 30,
          height: hovering ? 52 : 30,
          opacity: down ? 0.9 : hovering ? 1 : 0.6,
          backgroundColor: hovering ? "rgba(124,92,252,0.12)" : "transparent",
          borderColor: hovering ? "#8B7CF6" : "rgba(124,92,252,0.6)",
          boxShadow: hovering
            ? "0 0 24px rgba(124,92,252,0.55)"
            : "0 0 12px rgba(124,92,252,0.35)",
        }}
      />
    </>
  );
};

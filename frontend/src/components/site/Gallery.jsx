import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export const Gallery = ({ images }) => {
  const [active, setActive] = useState(null); // index or null

  const close = () => setActive(null);
  const prev = (e) => {
    e?.stopPropagation();
    setActive((i) => (i - 1 + images.length) % images.length);
  };
  const next = (e) => {
    e?.stopPropagation();
    setActive((i) => (i + 1) % images.length);
  };

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            data-testid={`gallery-thumb-${i}`}
            className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#111116] p-2 text-left transition-colors duration-500 hover:border-[#7C5CFC]/40"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/80 via-transparent to-transparent" />
              <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </span>
              <p className="absolute bottom-3 left-4 right-4 text-sm text-[#F5F5F7]">{img.caption}</p>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            data-testid="gallery-lightbox"
            className="fixed inset-0 z-[9997] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl sm:p-10"
          >
            <button
              onClick={close}
              data-testid="gallery-close"
              className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-white/40"
            >
              <X className="h-5 w-5" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  data-testid="gallery-prev"
                  className="absolute left-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-white/40 sm:left-8"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={next}
                  data-testid="gallery-next"
                  className="absolute right-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-white/40 sm:right-8"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <motion.figure
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full w-full max-w-5xl"
            >
              <img
                src={images[active].src}
                alt={images[active].caption}
                className="mx-auto max-h-[78vh] w-auto rounded-2xl border border-white/10"
              />
              <figcaption className="mt-4 text-center text-sm text-[#9A9AA5]">
                {images[active].caption}
                <span className="ml-2 text-[#6C6C7A]">
                  {active + 1} / {images.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

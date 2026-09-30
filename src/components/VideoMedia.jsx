import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/*
  Product video tile.
  playOn:
    "hover" - plays on mouse hover (desktop). On touch devices it plays while in view.
    "view"  - plays while at least 60% visible, pauses when scrolled away.
    "none"  - never autoplays (used for small thumbnails).
  The first frame is shown until it plays, and if the file is missing
  a placeholder with the product name is shown instead.
*/
export function VideoMedia({ src, label, className = "", playOn = "view", controls = false }) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(!src);
  const reduced = useReducedMotion();

  useEffect(() => { setFailed(!src); }, [src]);

  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    setCanHover(!!window.matchMedia && window.matchMedia("(hover: hover)").matches);
  }, []);

  const mode = playOn === "hover" && !canHover ? "view" : playOn;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    if (failed || reduced || mode !== "view") return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play().catch(() => {});
      else el.pause();
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [failed, reduced, mode]);

  const hoverProps = mode === "hover" && !reduced ? {
    onMouseEnter: () => ref.current?.play().catch(() => {}),
    onMouseLeave: () => ref.current?.pause()
  } : {};

  return <div className={`image-placeholder video-media ${playOn === "none" ? "video-media--thumb" : ""} ${className}`} {...hoverProps}>
    {!failed && <video
      ref={ref}
      src={`${src}#t=0.1`}
      muted loop playsInline
      preload="metadata"
      controls={controls || reduced}
      aria-label={label}
      onError={() => setFailed(true)}
    />}
    {failed && <div className="image-placeholder__fallback" role="img" aria-label={`${label} video`}><span>{label}</span><small>Video coming soon</small></div>}
  </div>;
}

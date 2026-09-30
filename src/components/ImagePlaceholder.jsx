import { useEffect, useState } from "react";

export function ImagePlaceholder({ src, alt, className = "", label }) {
  const [failed, setFailed] = useState(!src);
  useEffect(() => { setFailed(!src); }, [src]);
  return <div className={`image-placeholder ${className}`}>
    {!failed && <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
    {failed && <div className="image-placeholder__fallback" role="img" aria-label={alt || label || "ICEEIT image placeholder"}><span>{label || "ICEEIT"}</span><small>Image coming soon</small></div>}
  </div>;
}

export function ImagePlaceholder({ src, alt, className = "" }) {
  return (
    <div className={`image-placeholder ${className}`}>
      <img src={src} alt={alt} loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} />
      <div className="image-placeholder__fallback" aria-hidden="true">
        <span>ICEEIT</span>
        <small>Replace image</small>
      </div>
    </div>
  );
}

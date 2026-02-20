import { useEffect, useState } from "react";

export default function Image({
  src,
  alt,
  className,
  fallback,
  width,
  height,
  onClick,
}) {
  const [imgSrc, setImgSrc] = useState(src ?? fallback ?? "");
  const [_, setLoading] = useState(true);

  const handleError = () => {
    if (fallback) setImgSrc(fallback);
  };
  useEffect(() => {
    setImgSrc(src ?? fallback ?? "");
  }, [src, fallback]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onLoad={() => setLoading(false)}
      onError={handleError}
      loading="lazy"
      onClick={onClick}
    />
  );
}

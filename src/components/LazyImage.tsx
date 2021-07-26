import React, { memo, useState, useMemo, useRef, useLayoutEffect } from "react";
import IntersectionObservable from "../lib/IntersectionObservable";
import { Props } from "../types";

const LazyImage: React.FC<Props> = ({
  src,
  distance = "10%",
  children,
  ...imageAttributes
}) => {
  const [isDisplay, setIsDisplay] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const observable = useMemo<IntersectionObservable>(() => {
    return new IntersectionObservable({
      root: null,
      rootMargin: distance,
      threshold: 0.0,
    });
  }, [distance]);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const handleIntersect = ({
        isIntersecting,
      }: IntersectionObserverEntry) => {
        if (isIntersecting) {
          setIsDisplay(true);
        }
      };
      observable.register(containerRef.current, handleIntersect);

      return () => observable.disconnect();
    }
  }, [observable, containerRef, setIsDisplay]);

  return (
    <div ref={containerRef}>
      {isDisplay ? <img src={src} {...imageAttributes} /> : children}
    </div>
  );
};

export default memo(LazyImage);

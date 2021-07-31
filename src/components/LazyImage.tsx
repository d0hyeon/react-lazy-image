import React, { memo, useState, useMemo, useRef, useLayoutEffect } from "react";
import IntersectionObservable from "../lib/IntersectionObservable";
import { Props } from "../types";

const LazyImage: React.FC<Props> = ({
  src,
  distance,
  children,
  threshold = 0.0,
  ...imageAttributes
}) => {
  const [isDisplay, setIsDisplay] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const computedDistance = useMemo<string>(() => {
    if (distance) {
      return distance
        .split(" ")
        .reduce((arr, curr, idx) => {
          if (!/\%|\px/.test(curr)) {
            arr[idx] = `${curr}px`;
          } else {
            arr[idx] = curr;
          }
          return arr;
        }, [])
        .join("");
    }
    return "10%";
  }, [distance]);

  const observable = useMemo<IntersectionObservable>(() => {
    return new IntersectionObservable({
      root: null,
      rootMargin: computedDistance,
      threshold: threshold,
    });
  }, [computedDistance, threshold]);

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

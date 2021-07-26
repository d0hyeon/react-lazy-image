import React, { memo, useState, useMemo, useRef, useLayoutEffect } from "react";
import IntersectionObservable from "../lib/IntersectionObservable";
import { Props } from "../types";

const LazyImage: React.FC<Props> = ({
  src,
  baseElement = null,
  distance = "10%",
  children,
  ...imageAttributes
}) => {
  const [isDisplay, setIsDisplay] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const distanceStr = useMemo(() => {
    if (typeof distance === "number") {
      return `${distance}px`;
    }
    if (distance instanceof Array) {
      return distance
        .map((v) => (typeof v === "number" ? `${v}px` : v))
        .join(" ");
    }
    return distance;
  }, [distance]);

  const rootElement = useMemo<HTMLElement | null>(() => {
    if (!baseElement) {
      return null;
    }
    if ("current" in baseElement) {
      return baseElement.current;
    }
  }, [baseElement]);

  const observable = useMemo<IntersectionObservable>(() => {
    return new IntersectionObservable({
      root: rootElement,
      rootMargin: distanceStr,
      threshold: 0.0,
    });
  }, [rootElement, distanceStr]);

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

  return <>{isDisplay ? <img src={src} {...imageAttributes} /> : children}</>;
};

export default memo(LazyImage);

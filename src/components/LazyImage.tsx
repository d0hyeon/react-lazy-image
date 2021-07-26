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

  const rootElement = useMemo<HTMLElement>(() => document.body, []);

  const observable = useMemo<IntersectionObservable>(() => {
    return new IntersectionObservable({
      root: rootElement,
      rootMargin: distance,
      threshold: 0.0,
    });
  }, [rootElement, distance]);

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

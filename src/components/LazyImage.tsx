import React, {memo, useState, useMemo, useRef, useLayoutEffect} from 'react';
import IntersectionObservable from '../lib/IntersectionObservable';
import { Props } from '../@types/index';
import styles from './LazyImage.module.css';

const LazyImage: React.FC<Props> = ({
  src,
  staticWidth,
  staticHeight,
  alt = '', 
  title = '',
  baseElement = null,
  distance = '10%',
  children,
}) => {
  const [isDisplay, setIsDisplay] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [divWidth, divHeight] = useMemo<[string, string]>(() => ([
    staticWidth ? (typeof staticWidth === 'number' ? `${staticWidth}px` : staticWidth) : '',
    staticHeight ? typeof staticHeight === 'number' ? `${staticHeight}px` : staticHeight : ''
  ]), [staticWidth, staticHeight]);

  const distanceCss = useMemo(() => {
    if(typeof distance === 'number') {
      return `${distance}px`
    }
    // @ts-ignore
    if(distance instanceof Array) {
      return distance.map((v) => typeof v === 'number' ? `${v}px` : v).join(' ')
    }
    return distance
  }, [distance]);

  const observable = useMemo<IntersectionObservable>(() => {
    return new IntersectionObservable({
      root: baseElement,
      rootMargin: distanceCss,
      threshold: 0.0
    })
  }, [baseElement, distanceCss]);

  const defaultView = useMemo(() => {
    if(children) {
      return children;
    }
    if(divWidth || divHeight) {
      return <div style={{width: divWidth, height: divHeight}} />;
    }
    return null;
  }, [children, divWidth, divHeight])

  useLayoutEffect(() => {
    if(containerRef.current) {
      const handleIntersect = ({isIntersecting}: IntersectionObserverEntry) => {
        if(isIntersecting) {
          setIsDisplay(true);
        }
      }
      observable.register(containerRef.current, handleIntersect);

      return () => {
        observable.disconnect();
      }
    }
  }, [observable, containerRef, setIsDisplay])
    
  return (
    <div className={styles.container} ref={containerRef}>
      {isDisplay 
        ? <img src={src} title={title} alt={alt} />
        : defaultView
      }
    </div>
  )
}

export default memo(LazyImage);
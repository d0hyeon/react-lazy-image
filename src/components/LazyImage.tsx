import React, {memo, useState, useMemo, useRef, useLayoutEffect} from 'react';
import styled from '@emotion/styled';

import IntersectionObservable from '../lib/IntersectionObservable';

type RootMargin<T = string> = T | [T, T] | [T, T, T] | [T, T, T, T];

interface Props {
  src: string;
  staticWidth?: string | number;
  staticHeight?: string | number;
  title?: string;
  alt?: string;
  baseElement?: Element;
  distance?: RootMargin | RootMargin<number>;
  as?: React.ElementType;
}

const LazyImage: React.FC<Props> = ({
  src,
  staticWidth,
  staticHeight = '100px',
  alt = '', 
  title = '',
  baseElement = null,
  distance = 0,
  children,
  as
}) => {
  const [isDisplay, setIsDisplay] = useState<boolean>(false);
  const [divWidth, divHeight] = useMemo<[string, string]>(() => ([
    staticWidth ? (typeof staticWidth === 'number' ? `${staticWidth}px` : staticWidth) : '',
    staticHeight ? typeof staticHeight === 'number' ? `${staticHeight}px` : staticHeight : ''
  ]), [staticWidth, staticHeight]);

  const containerRef = useRef<HTMLDivElement>(null);
  const distanceCss = useMemo(() => {
    if(typeof distance === 'number') {
      return `${distance}px`
    }
    if(distance instanceof Array) {
      return distance.map((v) => typeof v === 'number' ? `${v}px` : v).join(' ')
    }
    return distance
  }, [distance]);
  const observable = useMemo<IntersectionObservable>(() => {
    console.log(distanceCss)
    return new IntersectionObservable({
      root: baseElement,
      rootMargin: distanceCss,
      threshold: 0.0
    })
  }, [baseElement, distanceCss]);

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
    <Container ref={containerRef} as={as ?? 'div'}>
      {isDisplay 
        ? <img src={src} title={title} alt={alt} />
        : children 
          ?? (!!divWidth || !!divHeight)
            ? <ShapeDiv width={divWidth} height={divHeight} />
            : null
      }
    </Container>
  )
}

const Container = styled.div`
  display: inline-block;
  font-size: 0;
`;

const ShapeDiv = styled.div<{width?: string; height?: string}>`
  ${({width, height}) => ({
    width: width || 'auto', 
    height: height || 'auto'
  })}
`;

export default memo(LazyImage);
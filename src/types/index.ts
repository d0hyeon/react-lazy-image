import { ImgHTMLAttributes, CSSProperties, MutableRefObject } from 'react';

type RootMargin<T = string> = T | [T, T] | [T, T, T] | [T, T, T, T];
type Target<T = HTMLElement> = T | MutableRefObject<T | null>;

export interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  baseElement?: Target;
  distance?: RootMargin | RootMargin<number>;
  style?: CSSProperties;
}
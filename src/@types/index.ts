type RootMargin<T = string> = T | [T, T] | [T, T, T] | [T, T, T, T];

export interface Props {
  src: string;
  staticWidth?: string | number;
  staticHeight?: string | number;
  title?: string;
  alt?: string;
  baseElement?: Element;
  distance?: RootMargin | RootMargin<number>;
}
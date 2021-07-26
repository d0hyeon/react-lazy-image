import { ImgHTMLAttributes, CSSProperties } from "react";

export interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  distance?: string;
  style?: CSSProperties;
}

export enum LoadingStrategy {
  Lazy = "lazy",
  Eager = "eager",
}

export type ImageProps = {
    src: string;
    alt: string;
    className?: string;
    width?: number | string;
    height?: number | string;
    loading?: LoadingStrategy;
  };
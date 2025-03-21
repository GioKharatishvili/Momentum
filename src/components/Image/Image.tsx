import { useState } from "react";
import classNames from "classnames";

import { IMAGE_PLACEHOLDER, ImageProps, LoadingStrategy } from "./lib";


//  lazy loading, fade-in ეფექტი placeholder-ის ჩასატვირთად
export const Image = ({
  src,
  alt,
  className = "",
  width,
  height,
  loading = LoadingStrategy.Lazy,
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" data-testid={IMAGE_PLACEHOLDER} />
      )}
      
      <img
        className={classNames(
          "w-full h-full object-fit transition-opacity duration-300",
          { "opacity-100": isLoaded, "opacity-0": !isLoaded }
        )}
        onLoad={() => setIsLoaded(true)}
        {...{ src, alt, width, height, loading }}
      />
    </div>
  );
};

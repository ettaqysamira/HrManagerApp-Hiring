import React from 'react';

function Image({
  src,
  alt = "Image Name",
  className = "",
  ...props
}) {

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        const name = (alt && alt !== "Image Name") ? alt : "User";
        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=128`;
        e.target.onError = null;
      }}
      {...props}
    />
  );
}

export default Image;

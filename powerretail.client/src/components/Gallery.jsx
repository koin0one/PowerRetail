import React, { useState, useEffect } from 'react';
import Masonry from "react-masonry-css";
import './styles.css';

const photosArr = []

for (let i = 1; i < 26; i++) {
    photosArr.push(`src/assets/images/${i}.jpg`)
}

const Gallery = () => {
  const [images, setPhotos] = useState(photosArr);
  
  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="masonry-grid"
      columnClassName="masonry-grid-column"
    >
      {images.map((src, index) => (
        <div className="gallery-item" key={index}>
          <img src={src} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </Masonry>
  );
};

export default Gallery;

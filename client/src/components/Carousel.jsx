import React, { useState } from "react";
import "./public/style.css";

const backendServer = 'http://localhost:3000'; // on development need to be changed.

function Carousel({slides , type}) {
  
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    if (index === slides.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const prevSlide = () => {
    if (index === 0) {
      setIndex(slides.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  const currentSlide = slides[index];
  const isVideo = currentSlide.endsWith(".mov") || currentSlide.endsWith(".mp4");

  return (
    <div>
      {isVideo ? (
        <video className={type==="Post"? "frame":"frame2"} controls>
          <source src={backendServer+'/'+currentSlide} />
        </video>
      ) : (
        <img src={backendServer+'/'+currentSlide} className={type==="Post"? "frame":"frame2"} alt={`Slide ${index + 1}`} />
      )}
      {type==="Post" &&
      <button onClick={nextSlide} className="next">
        ❰
      </button>
      }
      {type==="Post" &&
      <button onClick={prevSlide} className="prev">
        ❱
      </button>
      }
    </div>
  );
}

export default Carousel;

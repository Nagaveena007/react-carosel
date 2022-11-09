import React, { useEffect, useRef, useState } from "react";
import leftArrow from "../image-carousel/ImageSlider/icons/left-arrow.svg";
import rightArrow from "../image-carousel/ImageSlider/icons/right-arrow.svg";

const ImageCarousel = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState();
  const carouselItemsRef = useRef([]);
	
/*  const imageLenght = images.length; 
console.log(imageLenght,'imageLenght') */

  useEffect(() => {
    if (images && images[0]) {
      carouselItemsRef.current = carouselItemsRef.current.slice(
        0,
        images.length
      );

      setSelectedImageIndex(0);
      setSelectedImage(images[0]);
    }
  }, [images]);
  const handleSelectedImageChange = (newIdx) => {
    if (images && images.length > 0) {
      setSelectedImage(images[newIdx]);
      setSelectedImageIndex(newIdx);
      if (carouselItemsRef?.current[newIdx]) {
        carouselItemsRef?.current[newIdx]?.scrollIntoView({
          inline: "center",
          behavior: "smooth"
        });
      }
    }
  };

  const handleRightClick = () => {
    if (images && images.length > 0) {
      let newIdx = selectedImageIndex + 1;
      if (newIdx >= images.length) {
        newIdx = 0;
      }
      handleSelectedImageChange(newIdx);
    }
  };

  const handleLeftClick = () => {
    if (images && images.length > 0) {
      let newIdx = selectedImageIndex - 1;
      if (newIdx < 0) {
        newIdx = images.length - 1;
      }
      handleSelectedImageChange(newIdx);
    }
  };
  const moveDot = index => {
    setSelectedImageIndex(index)
		handleSelectedImageChange(index);
}


  return (
    <div className="carousel-container">
      <h2 className="header">Image Carousel</h2>
      <div
        className="selected-image"
				enableMouseEvents
      >
				{ selectedImageIndex > 0 &&
        <button className="prev btn-slide"
          onClick={handleLeftClick}>
        <img
          className='btn-slide-img'
        src={leftArrow}
        />
       </button>
        }
        <img src={selectedImage?.url} height="300" width="500" />
				{/* {selectedImageIndex < images-1 && */}
        <button className="next btn-slide"
          onClick={handleRightClick}>  
        <img
          className='btn-slide-img'
        src={rightArrow}
        />
       </button>
{/* } */}
        <div className="container-dots">
       {images &&
       images.map((image, index) => (
                    <div 
										key={index}
                    onClick={() => moveDot(index)}
                    className={selectedImageIndex === index ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>

      </div>
      <div className="carousel">
        <div 
				className="carousel__images" 
				>
          {images &&
            images.map((image, idx) => (
              <div
							
                onClick={() => handleSelectedImageChange(idx)}
								
                style={{ backgroundImage: `url(${image.url})` }}
                key={image.id}
                className={`carousel__image ${
                  selectedImageIndex === idx && "carousel__image-selected"
                }`}
                ref={(el) => (carouselItemsRef.current[idx] = el)}
              ></div>
            ))}
             
        </div>
				
				{ selectedImageIndex > 0 &&
        <button
          className="carousel__button carousel__button-left lower"
         onClick={handleLeftClick} 
        >
           <img
          className='btn-slide-img '
        src={leftArrow}
        />
        </button>
}
				{/* {
				selectedImageIndex < (images.length-1) && */}
        <button
          className="carousel__button carousel__button-right lower"
          onClick={handleRightClick} 
        >
          <img
          className='btn-slide-img '
        src={rightArrow}
        /> 
        </button>
				
		{/* 	}  */}
      </div>
    </div>
  );
};

export default ImageCarousel;

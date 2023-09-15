import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // 스타일을 불러옵니다.

export const imgSrc =
  "https://image.tving.com/ntgs/contents/CTC/caip/CAIP1500/ko/20230505/P001716794.jpg/dims/resize/F_webp,1024";

export const cardList = [
  {
    src: imgSrc,
  },
  {
    src: imgSrc,
  },
  {
    src: imgSrc,
  },
  {
    src: imgSrc,
  },
  {
    src: imgSrc,
  },
  {
    src: imgSrc,
  },
  {
    src: imgSrc,
  },
  {
    src: imgSrc,
  },
  {
    src: imgSrc,
  },
  {
    src: imgSrc,
  },
  {
    src: imgSrc,
  },
];

const MyCarousel = () => {
  return (
    <Carousel autoPlay={true} interval={500} showArrows={false}>
      <div>
        <img
          src='https://image.tving.com/ntgs/contents/CTC/caip/CAIP1500/ko/20230505/P001716794.jpg/dims/resize/F_webp,1024'
          alt='이미지 1'
        />
        <p className='legend'>이미지 1 설명</p>
      </div>
      <div>
        <img
          src='https://image.tving.com/ntgs/contents/CTC/caip/CAIP1500/ko/20230505/P001716794.jpg/dims/resize/F_webp,1024'
          alt='이미지 2'
        />
        <p className='legend'>이미지 2 설명</p>
      </div>
      <div>
        <img
          src='https://image.tving.com/ntgs/contents/CTC/caip/CAIP1500/ko/20230505/P001716794.jpg/dims/resize/F_webp,1024'
          alt='이미지 3'
        />
        <p className='legend'>이미지 3 설명</p>
      </div>
    </Carousel>
  );
};

export default MyCarousel;

import React from 'react';
import { Carousel, Image } from 'antd';


const ActorCarousel = ({ actors }) => {
  return (
    <Carousel autoplay style={{ height: "10%", width: "40vw" }} slidesToShow={4} >
      {actors.map((actor, index) => (
        <a
          key={index}
          style={{
            height: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
          href={actor.link} target="_blank" rel="noopener noreferrer"

        >
          <Image
            src={actor.image}
            style={{
              height: "35vh",
              width: "10vw",
              objectFit: "cover",
              alignItems:"center"
            }}
          />
          <span
          style={{
            color: "black", // Đặt màu chữ là đen
          }}>{actor.name}</span>
        </a>
      ))}
    </Carousel>
  );
};

export default ActorCarousel;

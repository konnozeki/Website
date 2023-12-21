import React from 'react';
import { Carousel, Image } from 'antd';

const ActorCarousel = ({ actors }) => {
  return (
    <Carousel arrows autoplay style={{ height: "10%", width: "40vw" }} slidesToShow={4}>
      {actors.map((actor, index) => (
        <div
          key={index}
          style={{
            height: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
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
          <span>{actor.name}</span>
        </div>
      ))}
    </Carousel>
  );
};

export default ActorCarousel;

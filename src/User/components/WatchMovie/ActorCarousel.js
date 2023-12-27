import React from 'react';
import { Carousel, Image } from 'antd';


const ActorCarousel = ({ actors }) => {
  return (
    <Carousel dots={false} autoplay style={{ height: "10%", width: actors.length >= 4? "40vw" : `${actors.length * 10}vw` }} slidesToShow={actors.length>=4?4:actors.length} >
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
          href={`/Actor/${actor.slug}`} target="_blank" rel="noopener noreferrer"

        >
          <Image
            src={actor.avatar}
            style={{
              height: "35vh",
              width: "10vw",
              objectFit: "cover",
              alignItems:"center"
            }}
          />
          <p
          style={{
            color: "black",
            textAlign: 'center' // Đặt màu chữ là đen
          }}>{actor.name}</p>
        </a>
      ))}
    </Carousel>
  );
};

export default ActorCarousel;

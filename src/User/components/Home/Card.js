import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import "./Card.scss"

const Card = () => {
    const filmClickNavigate = useNavigate();
    const handleFilmClick = () => {
        filmClickNavigate('/Register');
    }
    return (
        <div className="row-item">
            <div className="img-wrap pull-hover">


                <div className="thumbnail-box" onClick={handleFilmClick}>

                    <span>
                        <img src="https://i.pinimg.com/originals/00/11/59/00115951d7fde6a70d124748a27bd563.jpg"></img>
                    </span>
                    <div className="update-info-layer">

                        <div className="last-update">Ep 1</div>


                    </div>
                </div>


                <a href="https://www.iq.com/album/you-are-my-hero-2021-p4dari9smd?lang=en_us">
                    <div className="text-box" onClick={handleFilmClick}>
                        <div className="title">TÊn phim</div>
                    </div>
                </a>
            </div>
        </div>
    )
}





export default Card


import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Form, Input, Typography } from 'antd'
import "./Card.scss"
import Detail from './Detail'

const Card = ({ in4phim }) => {
    const filmClickNavigate = useNavigate();
    const handleFilmClick = () => {
        filmClickNavigate('/' + {});
    }
    const [hoveredMovie, setHoveredMovie] = useState(false);
    return (
        <div className="card" onMouseEnter={() => setHoveredMovie(true)}
            onMouseLeave={() => setHoveredMovie(false)} >
            <div className="thumbnail-box" onClick={handleFilmClick}>
                {hoveredMovie &&
                    (<Detail in4phim={in4phim} />)}
                <div>
                    <span>
                        <img className='card-image' src={in4phim.Avatar} alt={in4phim.Name}></img>
                    </span>
                </div>


            </div>

        </div>
    )
}





export default Card

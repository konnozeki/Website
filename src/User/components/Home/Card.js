
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Form, Input, Typography } from 'antd'
import "./Card.scss"
import Detail from './Detail'
import { backendUrl } from '../../../api'

const Card = ({ in4phim }) => {
    const filmClickNavigate = useNavigate();
    const handleFilmClick = () => {
        const filmId = in4phim.id;
        const filmSlug = in4phim.slug
        // Navigate to the new page with a full reload
        window.localStorage.setItem('currentWatching', 1)
        filmClickNavigate(`/watch/${filmSlug}`);
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
                        <img className='card-image' src={in4phim.poster.startsWith('http://') ? in4phim.poster : backendUrl(in4phim.poster)}
                            alt={in4phim.name}></img>
                    </span>
                </div>


            </div>

        </div>
    )
}





export default Card

import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Form, Input, Typography } from 'antd'
import "./BannerCard.scss"

const BannerCard = ({in4phim }) => {
    const filmClickNavigate = useNavigate();
    const handleFilmClick = () => {
        const slug = in4phim.slug;
        // Navigate to the new page with a full reload
        window.location.href = `/Watch/${slug}`;
    }
    return (
        <div className="banner-card">
            <div className="banner-thumbnail-box" onClick={handleFilmClick}>
                <div>
                    <span>
                        <img className='banner-card-image' src={in4phim.poster.startsWith('http://') ? in4phim.poster : `http://localhost:8000${in4phim.poster}`} alt={in4phim.name}></img>
                    </span>
                </div>
                    
                
            </div>
            
        </div>
    )
}





export default BannerCard

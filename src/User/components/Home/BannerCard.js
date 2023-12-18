import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Form, Input, Typography } from 'antd'
import "./BannerCard.scss"

const BannerCard = ({in4phim }) => {
    const filmClickNavigate = useNavigate();
    const handleFilmClick = () => {
        filmClickNavigate('/' + {});
    }
    return (
        <div className="banner-card">
            <div className="banner-thumbnail-box" onClick={handleFilmClick}>
                <div>
                    <span>
                        <img className='banner-card-image' src={in4phim.Avatar} alt={in4phim.Name}></img>
                    </span>
                </div>
                    
                
            </div>
            
        </div>
    )
}





export default BannerCard

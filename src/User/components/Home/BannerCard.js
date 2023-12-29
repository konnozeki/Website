import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Form, Input, Typography } from 'antd'
import "./BannerCard.scss"
import { backendUrl } from '../../../api'

const BannerCard = ({in4phim }) => {
    const filmClickNavigate = useNavigate();
    const handleFilmClick = () => {
        const slug = in4phim.slug;
        window.localStorage.setItem('currentWatching', 1)
        filmClickNavigate(`/watch/${slug}`);
    }
    return (
        <div className="banner-card">
            <div className="banner-thumbnail-box" onClick={handleFilmClick}>
                <div>
                    <span>
                        <img className='banner-card-image' src={in4phim.poster.startsWith('http://') ? in4phim.poster : backendUrl(in4phim.poster)} alt={in4phim.name}></img>
                    </span>
                </div>                 
            </div>     
        </div>
    )
}





export default BannerCard

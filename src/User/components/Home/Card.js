import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Form, Input, Typography } from 'antd'
import "./Card.scss"

const Card = ({in4phim }) => {
    const filmClickNavigate = useNavigate();
    const handleFilmClick = () => {
        filmClickNavigate('/' + {});
    }
    return (
        <div className="card">
            <div className="thumbnail-box" onClick={handleFilmClick}>
                <div className="imog" >
                    
                    <div className="update-info-layer">
                        <div className="last-update">{in4phim.id}</div>
                        <div className="ten-phim">{in4phim.Name}</div>
                    </div>
                    <span>
                        <img src={in4phim.Avatar}></img>
                    </span>
                </div>
                    
                
            </div>
            <div className="button-contain">
                <Button className="xem-ngay" onClick={handleFilmClick}>
                    Xem ngay
                </Button></div>
            
        </div>
    )
}





export default Card

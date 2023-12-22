import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Form, Input, Typography } from 'antd'
import "./Detail.scss"

const Detail = ({ in4phim }) => {
    const filmClickNavigate = useNavigate();
    const handleFilmClick = () => {
        filmClickNavigate('/' + {});
    }

  
    return (
        <div className="detail">
            
            <h1 className="detail-row-0">Day la ten phim ten phim ten ten ten ten ten ten ten ten ten ten ten ten ten ten ten  </h1>
            <div class="focus-info-tag">
                <span class="score-info-number">9.5</span>   
                <div class="broken-line"></div>
                <span class="age-rating-info-number">T13</span>
                <div class="broken-line"></div>
                <span class="eps-info-number">40 Episodes</span>
            </div>
            <div class="focus-info-tag type">
                <span class="type-style">Action</span>
                <span class="type-style">Romance</span>
                <span class="type-style">Medical</span>
                <span class="type-style">Urban</span>
                <span class="type-style">Youth</span>
                <span class="type-style">Sweet Love</span>
                <span class="type-style">Mandarin</span>
            </div>
            <div class="focus-info-desc ">
                <span class="key">
                    <h3>Description</h3>
                </span>
                <span class="description">In the emergency rescue drill organized jointly by the hospital and the police academy, the special police elite Xing Kelei met the inpatient doctor Mi Ka. As they got to know each other better, their relationship evolved from being incompatible to mutual understanding, and Xing Kelei fell deeply in love with Mi Ka. However, a sudden earthquake shattered their peaceful lives. Mi Ka and Xing Kelei were called to the disaster area and, in their rescue work, they demonstrated the spirit and will of the police and doctors who would risk their lives for their country. As the disaster relief work progressed, Mi Ka saw the righteousness of the police and Xing Kelei saw the compassion of the doctor. They both understood the duties and missions that each other carried on their shoulders even more. As police and doctors, they once again worked together to build a city, remaining loyal and steadfast to each other, and guarding the millions of people behind them.</span>

            </div>
            
           
        </div>

            
    )
}





export default Detail

//Trang Home
import List from "./List";
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import "./Home.scss"
import Banner from "./Banner";
import Category from "./Category";

function Home() {


    return (
        <div className='Home'>
       
            <Banner />
            <div className="List-containter">
                
            <div className="phim-theo-the-loai">
                <div className="ten-the-loai">
                <Category Category_Name={"Đề xuất cho bạn"} />
                </div>
                <List/>
            </div>
            </div>
        </div>
        
    )
}


export default Home
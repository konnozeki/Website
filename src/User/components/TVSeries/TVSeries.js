import List from "../Home/List";
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import "../Home/Home.scss"
import Banner from "../Home/Banner";
import Category from "../Home/Category";

function TVSeries() {
    const [category, setCategory] = useState([]);
    const array1 = [
        { Category_Name: "Action" },
        { Category_Name: "Anime" },
        { Category_Name: "Comedy" },
        { Category_Name: "Romantic" }
    ];
    const renderListOfUserNames = (names) => {
        return names.map(name => (
            <div className="phim-theo-the-loai">
                <Category Category_Name={name.Category_Name} />
                <List Category_Name={name.Category_Name} />
            </div>))
    }
    useEffect(() => {
        //fetchData(param).then(res => setCategory(res.data.results))
    }, []);

    return (
        <div className='TVSeries'>
            
            
            <div className="List-containter">

                {renderListOfUserNames(array1)}


            </ div>
        </ div>

    )
}


export default TVSeries
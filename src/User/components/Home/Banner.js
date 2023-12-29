// Banner.jsx

import React, { useEffect, useState } from 'react';
import "./Banner.scss";
import BannerCard from './BannerCard';
import { LIST_FILM_API } from '../../../api';

const Banner = () => {
    const [array2, setArray2] = useState([
        {
            id: 0,
            name: '',
            slug: '',
            description: '',
            actors: [],
            categories: [],
            country: 0,
            poster: '',
            age_restriction: 0,
            release_date: "2000-01-01"
        }
    ]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            
            const response = await fetch(LIST_FILM_API);
            const data = await response.json();
            
            // Assuming the response is an array of objects similar to array2
            setArray2(data);
            console.log(array2)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();

      }, []);

    const maxCharacters = 256;

    const truncateText = (text) => {
        if (text.length > maxCharacters) {
            return text.substring(0, maxCharacters) + '...';
        }
        return text;
    };

    return (
        <div className="home-banner">
            <div className="shadow"></div>
            <div className="banner-content">
                <div className="concord-img-container">
                    <img className="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="" />
                </div>
                <div className="banner-text">
                    <div className="banner-card-container">
                        <BannerCard in4phim={array2[0]}></BannerCard>
                    </div>
                    <div className='banner-card-text' onClick={()=>{window.location.href = `/Watch/${array2[0].slug}`}}>
                        <h1>{array2[0].name}</h1>
                        <p>{truncateText(array2[0].description)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;

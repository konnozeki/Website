// Banner.jsx

import React from 'react';
import "./Banner.scss";
import BannerCard from './BannerCard';

const Banner = () => {
    const array2 = [
        { id: 1, Avatar: "https://i.pinimg.com/474x/ce/d1/92/ced19202fc726b274caf80d96fb2fd0a.jpg", Name: "Elemental" },
    ];

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
                    <div className='banner-card-text'>
                        <h1>{array2[0].Name}</h1>
                        <p>{truncateText("This is the description of the Film. This is a longer description that should not affect the size of the BannerCard.This is the description of the Film. This is a longer description that should not affect the size of the BannerCard.This is the description of the Film. This is a longer description that should not affect the size of the BannerCardThis is the description of the Film. This is a longer description that should not affect the size of the BannerCardThis is the description of the Film. This is a longer description that should not affect the size of the BannerCardThis is the description of the Film. This is a longer description that should not affect the size of the BannerCard")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;

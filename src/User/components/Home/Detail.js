import React from 'react'

import "./Detail.scss"

const Detail = ({ in4phim }) => {

  
    return (
        <div className="detail">
            
            <h1 className="detail-row-0">{in4phim.name}</h1>
            <div class="focus-info-tag">
                <span class="eps-info-number">{in4phim.release_date}</span>
            </div>
            <div class="focus-info-desc ">
                <span class="key">
                    <h3>Mô tả</h3>
                </span>
                <span class="description">{in4phim.description}</span>

            </div>
            
           
        </div>

            
    )
}





export default Detail

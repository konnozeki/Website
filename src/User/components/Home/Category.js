import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import "./Category.scss"
const Category = ({ Category_Name }) => {

    return (
        <div style={{marginLeft: 40}} className="ten-the-loai">{Category_Name}</div>
    )
}







export default Category
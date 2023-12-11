//Trang Home
import List from "./List";
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import "./Home.scss"

function Home() {

    return (
        <div className='Home'>
        <div>HOme</div>

            <React.Fragment className="List-containter">
                <List />
                <List />
                <List />
                 <List/>
             </React.Fragment>
             
        </ div>
        
    )
}

export default Home
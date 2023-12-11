import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import Card from "./Card";
import "./List.scss"
const List = () => {
   
    return (
        <div className="list">
            <div>List</div>
            <React.Fragment className="card_container">
                <Card />
                <Card />
                <Card />
                <Card />
            </React.Fragment>
        </div>
               



            )
}
           




export default List
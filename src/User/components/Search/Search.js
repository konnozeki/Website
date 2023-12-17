//Trang Search
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography } from 'antd';
import "./Search.scss";
import SearchBar from "./SearchBar";
import Card from "../Home/Card";
 
function Search() {
    const filter = "TV"
    const clickMovieHandler = () => {
      
    }
    const clickOrderHandle = () => {

    }
    const clickPeopleHandler = () => {
        //in ra ket qua
    }
    const clickTVHandler = () => {
        //in ra ket qua
    }
    const [ketQua, setKetQua] = useState('');

    const childToParent = (childdata) => {//loi
        setKetQua(childdata);
    };
    const renderListOfPhim = (phims) => {
        return phims.map(boPhim => (

            <Card in4phim={boPhim} />
        ))
    }
  
    
  return (
      <>
      <div className='Search'>
              <div className="container">
                  <div className="d-flex-container">
                      <form className="d-flex">

                          <select name="che-do-tim" id="id_che-do" multiple>
                              <option onClick={clickMovieHandler}>Movie</option>
                              <option onClick={clickTVHandler}>TV</option>
                              <option onClick={clickPeopleHandler}>People</option>
                          </select>
                      </form></div>
              
              <div className="row-1">
                  
                      <SearchBar childToParent={childToParent} />
                      <div className="kq">
                          {ketQua.length === 0 ? (
                              <p>No results found.</p>
                          ) : (
                              <div className="kq-container">
                                      {renderListOfPhim(ketQua)}
                              </div>
                          )}

                      </div>

              </div>
                  
                 
                  

                

                      
            

               

        </div>
      </div>
    </>  )
}

export default Search
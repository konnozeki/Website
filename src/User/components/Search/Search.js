//Trang Search
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography } from 'antd';
import "./Search.scss";
import SearchBar from "./SearchBar";
import Card from "../Home/Card";
 
function Search() {
    const [filter, setFilter] = useState("movie");
    const clickName = () => {
        setFilter("name")
    }
    const clickFilter = () => {
        setFilter("filter")
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
                             
                              <option onClick={clickFilter}>Filter</option>
                              <option onClick={clickName}>Name</option>
                          </select>
                      </form></div>
              
              <div className="row-1">
                  
                      <SearchBar childToParent={childToParent} filter={filter} />
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
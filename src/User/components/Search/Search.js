//Trang Search
//Trang Search
import React from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Form, Input, Typography } from 'antd'
import "./Search.scss"
import SearchBar from "./SearchBar";

function Search() {

  const clickHandler = () => {

  }
  const clickOrderHandle = () => {

  }
  const handleSearchSubmit = () => {
    //in ra ket qua
  }



  return (
    <>
      <div className='Search'>
        <div className="container">
          <form className="d-flex">
            <select name="work_days" id="id_work_days" multiple>
              <option onClick={clickHandler}>Movie</option>
              <option onClick={clickHandler}>TV</option>
              <option onClick={clickHandler}>People</option>
            </select>
          </form>
          <SearchBar />

          <Button className='button-order' onClick={clickOrderHandle}>
            Last
          </Button>








        </div>
      </div>
    </>)
}

export default Search
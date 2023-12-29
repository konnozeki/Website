import List from "../Home/List";
import React, { useState, useEffect } from 'react';
import "../Home/Home.scss";
import Category from "../Home/Category";
import CategoryList from "../Home/CategoryList";
import { LIST_CATEGORY_API } from "../../../api";

function Movies() {
  const [category, setCategory] = useState([]);


  const fetchData = async () => {
    try {
      
      const response = await fetch(LIST_CATEGORY_API);
      const data = await response.json();
      setCategory(data); // Assuming the response is an array of category objects
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Run this effect once when the component mounts
  console.log(category)

  const renderListOfUserNames = (names) => {
    return names.map((name) => (
      <div key={name.id} className="phim-theo-the-loai">
        <Category Category_Name={name.name} />
        <CategoryList category={name.slug} />
      </div>
    ));
  };

  return (
    <div className='Movies'>
      <div className="List-containter">
        {category.length > 0 ? renderListOfUserNames(category) : null}
      </div>
    </div>
  );
}

export default Movies;

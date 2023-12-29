import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import './List.scss';
import { LIST_FILM_API } from '../../../api';

const List = () => {
  const [array2, setArray2] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(LIST_FILM_API);
        const data = await response.json();

        // Assuming the response is an array of objects similar to array2
        setArray2(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once on component mount

  const renderListOfPhim = (phims) => {
    // Take only the first 8 elements
    const slicedPhims = phims.slice(0, 10);

    return slicedPhims.map((boPhim) => <Card in4phim={boPhim} key={boPhim.id} />);
  };

  return (
    <div className="list">
      <div className="card_container">{renderListOfPhim(array2)}</div>
    </div>
  );
};

export default List;

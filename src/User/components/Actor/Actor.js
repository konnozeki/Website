import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  // Import useParams
import "./Actor.scss";
import { Image } from "antd";

function Actor() {
  const { slug } = useParams();  // Get the slug parameter from the URL

  // State to store actor data
  const [actorData, setActorData] = useState({
    actor: {
      id: 0,
      name: "",
      description: "",
      slug: "",
      gender: "",
      country: {
        id: 85,
        name: "China",
        flag: "https://flagcdn.com/w320/cn.png",
        slug: "china"
      },
      avatar: ""
    },
    films: [{
      id: 0,
      name: "",
      slug: "",
      description: "",
      actors: [
      ],
      categories: [
      ],
      country: 0,
      poster: "",
      age_restriction: 0,
      release_date: "1990-06-10"
    }]
  });
  // Function to fetch actor data
  const fetchActorData = async () => {
    try {
      // Make a fetch request to the API endpoint based on the extracted slug
      const response = await fetch(`http://localhost:8000/api/actor/${slug}/`);

      // Check if the request was successful (status code 200)
      if (response.ok) {
        // Parse the JSON response
        const data = await response.json();

        // Update the actor state with the fetched data
        setActorData(data);
      } else {
        // Handle the case where the request was not successful
        console.error("Failed to fetch actor data");
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Error fetching data:", error);
    }
  };

  // useEffect to fetch data when the component mounts or when the slug changes
  useEffect(() => {
    fetchActorData();
  }, [slug]); // Include slug in the dependency array

  return (
    <div className="container">
      <div className="info-container">
        <div className="avatar-container">
          <Image src={actorData.actor.avatar} style={{ height: 500 }} alt="Ảnh" className="avatar" />
        </div>
        <div className="info">
          <h1>{actorData.actor.name}</h1>
          <p className="info-item">Giới tính: {actorData.actor.gender == "M" ? "Nam" : "Nữ"}</p>
          <div className="country-info" style={{ display: 'flex' }}>
            <p className="info-item">Quốc tịch: {actorData.actor.country.name}</p>
            <img src={actorData.actor.country.flag} style={{ height: 20, width: 30, marginLeft: 10 }} alt="Ảnh" className="flag" />
          </div>
          <p className="description-actor">{actorData.actor.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Actor;

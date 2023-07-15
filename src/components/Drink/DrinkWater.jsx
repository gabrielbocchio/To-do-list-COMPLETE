import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlassWater } from "@fortawesome/free-solid-svg-icons";
import "./DrinkWater.css";

const DrinkWater = ({ currentDate }) => {
  const [activeGlasses, setActiveGlasses] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const storedActiveGlasses = localStorage.getItem(
      `activeGlasses_${currentDate}`
    );
    const initialActiveGlasses = storedActiveGlasses
      ? JSON.parse(storedActiveGlasses)
      : [];
    setActiveGlasses(initialActiveGlasses);
    setDataLoaded(true);
  }, [currentDate]);

  const handleClick = (index) => {
    const updatedActiveGlasses = [...activeGlasses];

    if (updatedActiveGlasses.includes(index)) {
      // If glass is already active, remove it from the activeGlasses array
      const glassIndex = updatedActiveGlasses.indexOf(index);
      updatedActiveGlasses.splice(glassIndex, 1);
    } else {
      // If glass is not active, add it to the activeGlasses array
      updatedActiveGlasses.push(index);
    }

    setActiveGlasses(updatedActiveGlasses);
  };

  useEffect(() => {
    if (dataLoaded) {
      localStorage.setItem(
        `activeGlasses_${currentDate}`,
        JSON.stringify(activeGlasses)
      );
    }
  }, [activeGlasses, currentDate, dataLoaded]);

  return (
    <div className="drink-water-parent">
       <div className="line-horizontal"></div>
      <span className="stayhydrated">#stayhydrated</span>
      <div className="drink-water-container">
        {[...Array(8)].map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={faGlassWater}
            className={`glass ${
              activeGlasses.includes(index) ? "active" : ""
            }`}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      <div className="line-horizontal"></div>
    </div>
  );
};

export default DrinkWater;




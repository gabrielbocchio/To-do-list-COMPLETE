import React, { useState, useEffect } from "react";
import { generateRandomId } from "../../utils/utils";
import Form from "../Form/Form";
import List from "../List/List";
import TasksRemaining from "../Remaining/TasksRemaining";
import Clear from "../Clear/Clear";
import "./layout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Humour from "../Humour/Humour";
import DrinkWater from "../Drink/DrinkWater";
import TodayDate from "../Date/TodayDate";

const Layout = () => {
  const [todayList, setTodayList] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [validationError, setValidationError] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const todayTasksStoraged = localStorage.getItem(formatDate(currentDate));
    const initialList = todayTasksStoraged ? JSON.parse(todayTasksStoraged) : [];
    setTodayList(initialList);
    setDataLoaded(true); // Marcar los datos como cargados desde el localStorage
  }, [currentDate]);

  useEffect(() => {
    if (dataLoaded) {
      localStorage.setItem(formatDate(currentDate), JSON.stringify(todayList));
    }
  }, [todayList, currentDate, dataLoaded]);

  const addItem = (e) => {
    e.preventDefault();
    if (newItem.length >= 3) {
      const newItemObj = {
        id: generateRandomId(),
        text: newItem,
        completed: false,
      };
      setTodayList([...todayList, newItemObj]);
      setNewItem("");
      setValidationError("");
    } else {
      setValidationError("Tasks should have more than 3 characters.");
    }
  };

  const toggleCompleted = (itemId) => {
    const updatedItems = todayList.map((el) => {
      if (el.id === itemId) {
        return { ...el, completed: !el.completed };
      }
      return el;
    });
    setTodayList(updatedItems);
  };

  const removeItem = (id) => {
    const newList = todayList.filter((item) => item.id !== id);
    setTodayList(newList);
  };

  const handleListUpdate = (updatedList) => {
    setTodayList(updatedList);
  };

  const goToPreviousDate = () => {
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(previousDate);
  };

  const goToNextDate = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container">
      <div className="date-container">
        <FontAwesomeIcon
          icon={faAngleLeft}
          onClick={goToPreviousDate}
          className="arrow-icon"
        />
        <TodayDate date={currentDate} />
        <FontAwesomeIcon
          icon={faAngleRight}
          onClick={goToNextDate}
          className="arrow-icon"
        />
        <button className="today" onClick={goToToday}>Today</button>
      </div>
      <Form
        setNewItem={setNewItem}
        addItem={addItem}
        newItem={newItem}
        validationError={validationError}
      />
      <List
        list={todayList}
        toggleCompleted={toggleCompleted}
        removeItem={removeItem}
        handleListUpdate={handleListUpdate}
      />
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <TasksRemaining list={todayList} />
        <Clear setList={setTodayList} />
      </div>
      <DrinkWater currentDate={formatDate(currentDate)} />
      <Humour currentDate={formatDate(currentDate)} />
    </div>
  );
};

export default Layout;

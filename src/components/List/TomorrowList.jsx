import { useState, useEffect } from 'react';
import List from './List';

const TomorrowList = ({ currentDate }) => {
  const [tomorrowList, setTomorrowList] = useState([]);

  useEffect(() => {
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);
    const tomorrowTasksStoraged = localStorage.getItem(formatDate(tomorrow));
    const initialList = tomorrowTasksStoraged ? JSON.parse(tomorrowTasksStoraged) : [];
    setTomorrowList(initialList);
  }, [currentDate]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <h3>Tomorrow's Tasks - {formatDate(new Date(currentDate.getTime() + 86400000))}</h3>
      <List list={tomorrowList} />
    </div>
  );
};

export default TomorrowList;

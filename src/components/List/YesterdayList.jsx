import { useState, useEffect } from 'react';
import List from './List';

const YesterdayList = ({ currentDate }) => {
  const [yesterdayList, setYesterdayList] = useState([]);

  useEffect(() => {
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    const yesterdayTasksStoraged = localStorage.getItem(formatDate(yesterday));
    const initialList = yesterdayTasksStoraged ? JSON.parse(yesterdayTasksStoraged) : [];
    setYesterdayList(initialList);
  }, [currentDate]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <h3>Yesterday's Tasks - {formatDate(new Date(currentDate.getTime() - 86400000))}</h3>
      <List list={yesterdayList} />
    </div>
  );
};

export default YesterdayList;
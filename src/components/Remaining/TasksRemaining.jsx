const TasksRemaining = ({ list }) => {
    const remainingTasks = list.filter(item => !item.completed).length;
  
    if (remainingTasks === 0) {
      return <div>No tasks remaining</div>;
    }
  
    return (
      <div>
        {remainingTasks} remaining tasks
      </div>
    );
  };
  
  export default TasksRemaining;
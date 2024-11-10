import React from 'react';
import axios from 'axios';
import './TaskList.css'; // Importing CSS file

const TaskList = ({ tasks, setTasks }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleCompletion = async (id) => {
    const taskToUpdate = tasks.find(task => task._id === id);
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    try {
      const response = await axios.put(`http://localhost:5000/tasks/${id}`, updatedTask);
      setTasks(tasks.map(task => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task._id} className="task-item">
          <div className="task-content">
            <span 
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }} 
              className="task-text"
            >
              {task.task}
            </span>
            <span className={`priority ${task.priority ? task.priority.toLowerCase() : 'normal'}`}>
              {task.priority || 'Normal'}
            </span>
            <span className="due-date">
              {task.dueDate ? `Due: ${task.dueDate}` : 'No Due Date'}
            </span>
          </div>
          <div className="task-actions">
            <button 
              className={`action-btn ${task.completed ? 'undo' : 'complete'}`} 
              onClick={() => handleToggleCompletion(task._id)}
            >
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button 
              className="action-btn delete" 
              onClick={() => handleDelete(task._id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;

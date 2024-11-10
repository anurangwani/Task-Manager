import React, { useState } from 'react';
import axios from 'axios';
import './TaskList.css'; // Importing CSS file

const TaskForm = ({ setTasks }) => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task) {
      try {
        const response = await axios.post('http://localhost:5000/tasks', { task, priority, dueDate });
        setTasks(prevTasks => [...prevTasks, response.data]);
        setTask('');
        setPriority('Medium');
        setDueDate('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <select 
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;

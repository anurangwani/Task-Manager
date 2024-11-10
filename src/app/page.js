'use client';  // Important to use client-side hooks like useState and useEffect

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');  // Filter (Completed, Uncompleted, All)

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then((response) => setTasks(response.data))
      .catch((err) => console.error(err));
  }, []);

  // Filter tasks based on search query and filter type (completed/uncompleted)
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Uncompleted') return !task.completed;
    return true; // Show all tasks if filter is "All"
  }).filter((task) => {
    // Check if task.task is defined and then convert to lower case for searching
    return task?.task && task.task.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <h1>Task List</h1>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: '8px',
          marginBottom: '20px',
          width: '300px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />

      {/* Filter Dropdown */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          padding: '8px',
          marginLeft: '10px',
          marginBottom: '20px',
          width: '150px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      >
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Uncompleted">Uncompleted</option>
      </select>

      {/* Task Form */}
      <TaskForm setTasks={setTasks} />
      
      {/* Task List */}
      <TaskList tasks={filteredTasks} setTasks={setTasks} />
    </div>
  );
}

export default TaskPage;

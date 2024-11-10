'use client';  // Important to use client-side hooks like useState and useEffect

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then((response) => setTasks(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      <TaskForm setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default TaskPage;

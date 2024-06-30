import { useState,useEffect } from 'react'
import './App.css';
import TaskView from './components/TaskView';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };
  const deleteTask = (index) => {
    const newTasks = tasks.filter((task, taskIndex) => {
      return taskIndex !== index
    });
    setTasks(newTasks);
  };
  const updateTaskStatus = (index, status) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].taskStatus = status;
    setTasks(updatedTasks);
  };

  return (
    <>
      <div className='container-fluid w-100'>
        <div className='row'>
          <div className='col col-md-4 col-sm-6'>
            <TaskForm addTask={addTask}/>
          </div>
          <div className='col col-md-8 col-sm-6'>
            <TaskView tasks = {tasks} deleteTask={deleteTask} updateTaskStatus={updateTaskStatus}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App



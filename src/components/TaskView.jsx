import React, {useState,useEffect} from "react";
import FilterTheTask from './FilterTask';

export default function TaskView({tasks,deleteTask,updateTaskStatus}){

  const [filterType, setFilterType] = useState('all');
  const [localTasks, setLocalTasks] = useState([]);
  const [startUpdating, setStartUpdating] = useState(null);

  const [editTask, setEditTask] = useState({ taskTitle: '', taskDescription: '' });

  useEffect(() => {
    // Initialize localTasks from props.tasks on component mount
    setLocalTasks(tasks);
  }, [tasks]);
  useEffect(() => {
    console.log('localTasks updated:', localTasks);
  }, [localTasks]);

  // Function to handle update form in index
  const startUpdatingTask = (index) => {
    setStartUpdating(index);
    setEditTask(localTasks[index]); 
  }

 // Function to handle updating a task
 const handleUpdateTask = (e, name) => {
  setEditTask({ ...editTask, [name]: e.target.value });
};

const saveTask = () => {
  const updatedTasks = [...localTasks];
  console.log({updatedTasks})

  updatedTasks[startUpdating] = editTask;

  setLocalTasks(updatedTasks);
  console.log({localTasks})
  setStartUpdating(null); // Clear editedTask state after saving
  console.log('Updated Tasks After Save:', updatedTasks);
};

// Function to cancel editing
const cancelEditing = () => {
  setStartUpdating(null); // Clear editedTask state
};

// Function to handle deleting a task
  const handleDeleteTask = (index) => {
    const updatedTasks = [...localTasks];
    updatedTasks.splice(index, 1);
    setLocalTasks(updatedTasks);
    deleteTask(index);
  };
  
  const handleUpdateStatus = (index) => {
    // Toggle the taskStatus
    updateTaskStatus(index, !tasks[index].taskStatus);

  };

  const setFilter = (type) => {
    setFilterType(type);
  };
  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };
  // Filter tasks based on filter type
  const filteredTasks = tasks.filter((task) => {
    if (filterType === 'all') {
      return true;
    } else if (filterType === 'active') {
      return !task.taskStatus; 
    } else if (filterType === 'completed') {
      return task.taskStatus; 
    }
    return true; 
  });
    return(
        
          <div className="card rounded p-0">
            <div className="card-body p-3">
              <h4 className="text-center my-1 pb-3">Task List</h4>
              <FilterTheTask filterTypes = {filterType} handleClick={setFilter}/>
              <div className="table-responsive">
              <table className="table mb-4 mt-4">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredTasks.map((task,index)=> (
                    <tr key={index}>
                    {startUpdating === index ? (
                        <>
                        <td>{index + 1}</td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={editTask.taskTitle}
                            onChange={(e) => handleUpdateTask(e, 'taskTitle')}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={editTask.taskDescription}
                            onChange={(e) => handleUpdateTask(e, 'taskDescription')}
                          />
                        </td>
                        {/* <td>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={task.taskStatus}
                            onChange={() => handleUpdateStatus(index)}
                          />
                          <label className="form-check-label ms-2">
                            {task.taskStatus ? 'Completed' : 'Not Completed'}
                          </label>
                        </td> */}
                        <td colSpan={2}>
                          <button className="btn btn-success me-2" onClick={() => saveTask(index, task)}>
                            Save
                          </button>
                          <button className="btn btn-secondary" onClick={cancelEditing}>
                            Cancel
                          </button>
                        </td>
                      </>
                    ) :
                    
                      (
                        <>
                          <th scope="row">{index + 1}</th>
                          <td>{task.taskTitle}</td>
                          <td>{truncateText(task.taskDescription, 7)}</td>
                          <td>{task.taskStatus ? 'Completed' : 'Not completed'}</td>
                          <td> 
                            <button className="btn btn-danger mx-2" onClick={() => handleDeleteTask(index)}>
                              Delete
                            </button>
                            <button className="btn btn-primary mx-2" onClick={()=> startUpdatingTask(index)}>
                              Edit
                            </button>
                            <button
                              className={`btn mw-100 ${task.taskStatus ? 'btn-secondary' : 'btn-success'}`}
                              onClick={() => handleUpdateStatus(index)}
                            >
                              {task.taskStatus ? 'Mark Incomplete' : 'Mark Complete'}
                            </button>
                          </td>
                        </>
                      )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            </div>
          </div>
       
    );
}
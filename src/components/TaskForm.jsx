import React, {useState,useEffect} from "react";

export default function TaskForm({ addTask }){
    
    const [task,setTask] = useState({
        taskTitle : '',
        taskDescription : '',
        taskStatus: false
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("result",task)
        addTask(task)
        setTask({   
            taskTitle: '',
            taskDescription: '',
            taskStatus: false
        });
    }
    const handleChange = (e) => {
    
    const name = e.target.name;
    let value = e.target.value;

    if(e.target.type === 'checkbox'){
        value = e.target.checked;
    }
    setTask(prevTask => ({
        ...prevTask,
        [name]: value
    }));
    }
    return(
        <div className="card rounded">
            <div className="card-body p-3">
                <h4 className="text-center my-1 pb-3">Add Task</h4>
                <form onSubmit={handleSubmit} className="text-start">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Task Title</label>
                        <input 
                            type="text"
                            className="form-control" 
                            id="taskTitle" 
                            placeholder="Task title" 
                            name="taskTitle"
                            value={task.taskTitle}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="taskDescription" className="form-label">Task Description</label>
                        <textarea 
                            input="text"
                            className="form-control" 
                            id="taskDescription" 
                            rows="3"
                            placeholder="Task description" 
                            name="taskDescription"
                            value={task.taskDescription}
                            onChange={handleChange}
                        >
                        </textarea>
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="taskStatus"
                            name="taskStatus"
                            checked={task.taskStatus}
                            onChange={handleChange}
                        />
                         <label className="form-check-label" htmlFor="taskStatus">Completed</label>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary text-uppercase w-100">Add</button>
                    </div>
                </form>
            </div>
        </div>
      
    );
}

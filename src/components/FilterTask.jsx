export default function FilterTheTask({filterTypes,handleClick}) {
   
    return(
        <div className="mb-3">
                <button
                  className={`btn ${filterTypes === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => handleClick('all')}
                >
                  Show All
                </button>
                <button
                  className={`btn ${filterTypes === 'active' ? 'btn-primary' : 'btn-secondary'} ms-2`}
                  onClick={() => handleClick('active')}
                >
                  Show Active
                </button>
                <button
                  className={`btn ${filterTypes === 'completed' ? 'btn-primary' : 'btn-secondary'} ms-2`}
                  onClick={() => handleClick('completed')}
                >
                  Show Completed
                </button>
              </div>
    )
    
}
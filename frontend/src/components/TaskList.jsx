import React from 'react'
import TaskEmpty from './TaskEmpty'
import TaskCard from './TaskCard'

const TaskList = () => {
  let filter = 'all'
  const filteredTasks = []

  if(!filteredTasks || filteredTasks.length === 0 )
  {
    return <TaskEmpty filter={filter}/>
  }
  return (
    <div className="space-y-3">
      {
        filteredTasks.map((task, index)=>(
          <TaskCard 
            key={task._id? task._id: index}
            task = {task}
            index = {index }
          />
        ))
      }
    </div>
  )
}

export default TaskList
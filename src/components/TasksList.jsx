import React, { useState } from 'react'
import Task from './Task'
import TaskAdd from './TaskAdd'

function TasksList({tasks, addTaskCallback, completeTaskCallback}) {
  const [onDisplay,setOnDisplay] = useState('tasksList')

  const addTask = () => {
    setOnDisplay('addTask')
  }
  
  const addTaskInnerCallback = (e,title) => {
    addTaskCallback(e,title)
    setOnDisplay('tasksList')
  }

  const isOnDisplay = (element) => {
    return onDisplay == element
  }

  return (
    <div className='section'>
      <div className='container space-between'>
        ToDos - User {tasks[0]?.userId}
        <button onClick={addTask}>Add</button>
      </div>
      <br />
      <div className='section-border'>
        <div style={!isOnDisplay('addTask')?{display:'none'}:{}}>
          <TaskAdd callback={addTaskInnerCallback} />
        </div>
        <div style={!isOnDisplay('tasksList')?{display:'none'}:{}}>
        {
          tasks.map((task)=>{
            return <Task key={task.id} item={task} completeTaskCallback={completeTaskCallback} />
          })
        }
        </div>
      </div>
    </div>
  )
}

export default TasksList
import { useState } from 'react'
import TaskItem, {TaskCompleteOnClickEvent} from './TaskItem'
import TaskAdd, {TaskAddOnClickEvent} from './TaskAdd'
import {ToDo} from '../types'

function TasksList({tasks, addTaskCallback, completeTaskCallback} : {tasks: ToDo[], addTaskCallback: TaskAddOnClickEvent, completeTaskCallback: TaskCompleteOnClickEvent}) {
  const [onDisplay,setOnDisplay] = useState<'tasksList' | 'addTask'>('tasksList')

  const addTask = () => {
    setOnDisplay('addTask')
  }
  
  const addTaskInnerCallback = (action: string, title: string) => {
    addTaskCallback(action, title)
    setOnDisplay('tasksList')
  }

  return (
    <div className='taskslist'>
      <div className='taskslist-top'>
        <h1>ToDos - User {tasks[0]?.userId}</h1>
        <button type='button' onClick={addTask}>Add</button>
      </div>
      <div className='taskslist-bottom'>
        {
          onDisplay === 'addTask' && <TaskAdd onClick={addTaskInnerCallback} />
        }
        {
          onDisplay === 'tasksList' && tasks.map((task)=>{
            return <TaskItem key={task.id} item={task} onClickComplete={completeTaskCallback} />
          })
        }
      </div>
    </div>
  )
}

export default TasksList
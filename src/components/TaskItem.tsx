import { ToDo } from '../types'

export type TaskCompleteOnClickEvent = (taskId: number) => void

function TaskItem({ item, onClickComplete }: { item: ToDo, onClickComplete: TaskCompleteOnClickEvent }) {
  const completeTask = () => {
    onClickComplete(item.id)
  }

  return (
    <div className='task-item'>
      <label>Title: </label><span>{item.title}</span>
      <label>Completed: </label>
      <span className="task-item--completed_status_actions">
        {String(item.completed)}
        {
          !item.completed &&
          <button type='button' onClick={completeTask}>Mark Completed</button>
        }
      </span>
    </div>
  )
}

export default TaskItem
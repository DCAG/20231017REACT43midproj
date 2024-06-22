//DONE
import { useState } from 'react'

export type TaskAddOnClickEvent = (action: 'cancel' | 'add' | string, title: string) => void

function TaskAdd({ onClick }: { onClick: TaskAddOnClickEvent }) {
  const [title, setTitle] = useState('')

  const addItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick(event.currentTarget.name, title)
  }

  return (
    <div className='task-add'>
      <div className='task-add--fields'>
        <label htmlFor="title">Title: </label><input title='title' type='text' onChange={(e) => { setTitle(e.target.value) }} />
      </div>
      <div className='task-add--actions'>
        <button type='button' name='cancel' onClick={addItem}>Cancel</button>
        <button type='button' name='add' onClick={addItem}>Add</button>
      </div>
    </div>
  )
}

export default TaskAdd
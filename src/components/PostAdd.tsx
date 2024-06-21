import { useState } from 'react'

export type PostAddOnClickEvent = (action:'add' | 'cancel' | string, title:string, body:string) => void

function PostAdd({onClick} : {onClick: PostAddOnClickEvent}) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const addItem = (event:React.MouseEvent<HTMLButtonElement>) => {
    onClick(event.currentTarget.name, title, body)
  }

  return (
    <div className='post-add'>
        <div className='post-add--fields'>
          <label htmlFor="title">Title: </label><input title='title' type='text' onChange={(e) => {setTitle(e.target.value)}} />
          <label htmlFor="body">Body: </label><textarea title='body' onChange={(e) => {setBody(e.target.value)}} />
        </div>
        <div className='post-add--actions'>
          <button type='button' name='cancel' onClick={addItem}>Cancel</button>
          <button type='button' name='add' onClick={addItem}>Add</button>
        </div>
    </div>
  )
}

export default PostAdd
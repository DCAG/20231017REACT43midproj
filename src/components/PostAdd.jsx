import React, { useState } from 'react'

function PostAdd({callback}) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const addItem = (e) => {
    callback(e.target.name,title,body)
  }

  return (
    <div className='add-item-dialog'>
        Title: <input type='text' onChange={(e) => {setTitle(e.target.value)}} />
        <br />
        Body: <input type='text' onChange={(e) => {setBody(e.target.value)}} />
        <br />
        <br />
        <div>
          <button name='cancel' onClick={addItem}>Cancel</button>
          <button name='add' onClick={addItem}>Add</button>
        </div>
    </div>
  )
}

export default PostAdd
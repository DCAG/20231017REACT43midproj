import React, { useState } from 'react'

function UserAdd({addUserCallback}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const addItem = (e) => {
    addUserCallback(e.target.name,name,email)
  }

  return (
    <div>
        Add New User
        <div className='section-border add-item-dialog'>
            Name:  <input type='text' onChange={e=>{setName(e.target.value)}}/>
            <br />
            Email: <input type='text' onChange={e=>{setEmail(e.target.value)}}/>
            <br />
            <br />
            <div>
              <button name='cancel' onClick={addItem}>Cancel</button>
              <button name='add' onClick={addItem}>Add</button>
            </div>
        </div>
    </div>
  )
}

export default UserAdd
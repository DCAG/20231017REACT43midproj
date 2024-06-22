import { useState } from 'react'

export type UserAddOnClickEvent = (action: 'cancel' | 'add' | string, name: string, email: string) => void

function UserAdd({ onClick }: { onClick: UserAddOnClickEvent }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const addItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick(event.currentTarget.name, name, email)
  }

  return (
    <div className='user-add'>
      <h1>Add New User</h1>
      <div className='user-add-form'>
        <div className='user-add-form--fields'>
          <label>Name: </label><input type='text' title='name' onChange={e => { setName(e.target.value) }} />
          <label>Email: </label><input type='text' title='email' onChange={e => { setEmail(e.target.value) }} />
        </div>
        <div className='user-add-form--actions'>
          <button type='button' name='cancel' onClick={addItem}>Cancel</button>
          <button type='button' name='add' onClick={addItem}>Add</button>
        </div>
      </div>
    </div>
  )
}

export default UserAdd
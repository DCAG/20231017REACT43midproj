import { useEffect, useState } from 'react'
import { User, Address } from '../types'

export type UserActionsEvent = (action: 'select' | 'update' | 'delete' | string, user: User) => void

function UserItem({ item, isSelectedUser, userActionsCallback }: { item: User, isSelectedUser: boolean, userActionsCallback: UserActionsEvent }) {
  const [user, setUser] = useState<User>(item)
  const [displayOtherData, setDisplayOtherData] = useState(false)

  useEffect(() => {
    setUser(item)
  },[item])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value }: { name: string, value: Address | number | string } = event.currentTarget;
    value = isNaN(Number(value)) ? value : +value;
    // handle specific nested properties (under 'address')
    if (['street', 'city', 'zipcode'].includes(name)) {
      value = { ...user.address, [name]: value }
      name = 'address'
    }
    setUser({ ...user, [name]: value });
  }

  const selectUser = () => {
    userActionsCallback('select', user)
  }

  const updateUser = () => {
    userActionsCallback('update', user)
  }

  const deleteUser = () => {
    userActionsCallback('delete', user)
  }

  const hideOtherData = () => {
    setDisplayOtherData(false)
  }

  const showOtherData = () => {
    setDisplayOtherData(true)
  }

  return (
    <div className={`user-item${isSelectedUser ? ' selected' : ''}${user.isAllTasksCompleted ? ' all-tasks-completed' : ''}`}>
      <div className='user-item--fields-basic'>
        <label htmlFor='id'>ID: </label><span title='id - click to select user' onClick={selectUser}>{user.id}</span>
        <label htmlFor='name'>Name: </label><input title='name' type='text' name='name' defaultValue={user.name} onChange={handleChange} />
        <label htmlFor='email'>Email: </label><input title='email' type='text' name='email' defaultValue={user.email} onChange={handleChange} />
      </div>
      <div className={`user-item--otherdata_and_actions${displayOtherData?'':' closed'}`}>
        <button type='button' className='user-item--show_otherdata_btn' onMouseOver={showOtherData} onClick={hideOtherData}>Other Data</button>
        {
          displayOtherData && <div className='user-item--fields-otherdata'>
            <label htmlFor='street'>Street: </label><input type='text' title='street' name='street' defaultValue={user.address?.street} onChange={handleChange} />
            <label htmlFor='city'>City: </label><input type='text' title='name' name='city' defaultValue={user.address?.city} onChange={handleChange} />
            <label htmlFor='zipcode'>Zip Code: </label><input type='text' title='zipcode' name='zipcode' defaultValue={user.address?.zipcode} onChange={handleChange} />
          </div>
        }
        <div className='user-item--actions'>
          <button type='button' onClick={updateUser}>Update</button>
          <button type='button' onClick={deleteUser}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default UserItem
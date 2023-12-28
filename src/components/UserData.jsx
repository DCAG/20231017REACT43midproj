import { useEffect, useState } from 'react'

function UserData({item,isSelectedUser,userActionsCallback}) {
  const [user, setUser] = useState({})
  const [displayOtherData, setDisplayOtherData] = useState(false)

  useEffect(()=>{
    setUser({...item})
  },[item])

  const handleChange = (e) => {
    let { name, value } = e.target;
    value = isNaN(value) ? value : +value;
    // handle specific nested properties (under 'address')
    if(['street','city','zipcode'].includes(name)){
      value = {...user.address, [name]: value}
      name = 'address'
    }
    setUser({ ...user, [name]: value });
  }

  const selectUser = () => {
    userActionsCallback('select',user)
  }

  const updateUser = () => {
    userActionsCallback('update',user)
  }

  const deleteUser = () => {
    userActionsCallback('delete',user)
  }

  const hideOtherData = () => {
    setDisplayOtherData(false)
  }

  const showOtherData = () => {
    setDisplayOtherData(true)
  }

  return (
    <div className='section-item-border' style={{
      backgroundColor:isSelectedUser?'orange':'white',
      borderColor:user.isAllTasksCompleted?'green':'red'}}>
      <pre>
        <span onClick={selectUser}>
          ID:    {user.id}
        </span><br />
        Name:  <input type='text' name='name' defaultValue={user.name} onChange={handleChange} /><br />
        Email: <input type='text' name='email' defaultValue={user.email} onChange={handleChange}/><br />
      </pre>
      <div className={displayOtherData?'':'container space-between'}>
        <button style={{backgroundColor:'gray'}} onMouseOver={showOtherData} onClick={hideOtherData}>Other Data</button>
        <div className='user-other-data' style={!displayOtherData?{display:'none'}:{}}>
          <pre>
            Street:   <input type='text' name='street' defaultValue={user.address?.street} onChange={handleChange}/> <br />
            City:     <input type='text' name='city' defaultValue={user.address?.city} onChange={handleChange}/> <br />
            Zip Code: <input type='text' name='zipcode' defaultValue={user.address?.zipcode} onChange={handleChange}/> <br />
          </pre>
        </div>
        <div style={{textAlign:'right'}}>
          <button onClick={updateUser}>Update</button>
          <button onClick={deleteUser}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default UserData
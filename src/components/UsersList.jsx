import UserData from './UserData'

function UsersList({users, userActionsCallback, selectedUserId}) {
  const soryById = (user1, user2) => {
    return user1.id - user2.id
  }

  return (
    <div className='section'>
    {
        users.sort(soryById).map((user) => {
            const isSelectedUser = selectedUserId===user.id
            return <UserData key={user.id}
              item={user} 
              isSelectedUser={isSelectedUser} 
              userActionsCallback={userActionsCallback}
              />
        })
    }
    </div>
  )
}

export default UsersList
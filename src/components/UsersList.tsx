import UserItem, { UserActionsEvent } from './UserItem'
import { User } from '../types'
import { useMemo } from 'react'

function UsersList({ users, userActionsCallback, selectedUserId }: { users: User[], userActionsCallback: UserActionsEvent, selectedUserId: number }) {
  const sortById = (user1: User, user2: User) => {
    return user1.id - user2.id
  }

  const sortedUsers = useMemo(() => users.sort(sortById), [users])

  return (
    <div className='userslist'>
      {
        sortedUsers.map((user: User) => {
          const isSelectedUser = selectedUserId === user.id
          return <UserItem key={user.id}
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
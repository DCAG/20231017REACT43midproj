import { useState, useEffect, useMemo } from 'react'
import './App.css'
import utils from './utils.js'
import UsersList from './components/UsersList.tsx'
import PostsList from './components/PostsList.tsx'
import TasksList from './components/TasksList.tsx'
import UserAdd from './components/UserAdd.tsx'
import * as JPHTypes from './types'

function App() {
  //#region useStates
  const [users, setUsers] = useState<JPHTypes.User[]>([])
  const [posts, setPosts] = useState<JPHTypes.Post[]>([])
  const [tasks, setTasks] = useState<JPHTypes.ToDo[]>([])

  const [searchPhrase, setSearchPhrase] = useState('')
  const filteredUsers = useMemo(() => 
    users.filter((user: JPHTypes.User) => {
      return user.name.toLowerCase().includes(searchPhrase) || 
             user.email.toLowerCase().includes(searchPhrase)
    }
  ),[users,searchPhrase])
  
  const [selectedUser, setSelectedUser] = useState<number>(-1)
  const [rightDisplay,setRightDisplay] = useState<''|'none'|'userLists'|'addUser'>('')

  const filteredTasks = useMemo(() => tasks.filter((task: JPHTypes.ToDo)=>task.userId===selectedUser),[tasks,selectedUser])
  const filteredPosts = useMemo(() => posts.filter((post: JPHTypes.Post)=>post.userId===selectedUser),[posts,selectedUser])
  //#endregion

  //#region useEffects
  useEffect(() => {
    // run once at page initialization
    const initDB = async () => {
      console.debug('init => (useEffect) initDB')
      const users = await utils.getUsers()
      const posts = await utils.getPosts()
      const tasks = await utils.getTasks()
      setUsers(users)
      setPosts(posts)
      setTasks(tasks)
    }
    
    initDB()
  },[])

  useEffect(() => {
    /*
    runs everytime the state of 'tasks' list is updated
    updates the state of 'users' list with property 'isAllTasksCompleted'
    */
    console.debug("tasks => (useeffect) users")
    const updatedUsers = users.map(
      (user: JPHTypes.User) => {
        // gets the list of all uncompleted tasks and if there are none set property to "true"
        const uncompletedTasks = tasks.filter((task: JPHTypes.ToDo) => {
          return task.userId == user.id && !task.completed
        })
        const updatedUser = {...user, isAllTasksCompleted: uncompletedTasks.length === 0}
        return updatedUser
      }
    )
    setUsers(updatedUsers)
    console.debug("count of free users: " + users.filter((user: JPHTypes.User) => {return user.isAllTasksCompleted}).length)
  },[tasks])
  //#endregion

  //#region callbacks
  const addUserCallback = (action:'cancel' | 'add' | string, name: string, email: string): void => {
    switch(action){
      case 'cancel':
        break;
      case 'add': {
        const newUser = {
          id: users[users.length-1].id + 1,
          name: name,
          email: email,
          isAllTasksCompleted: true,
          address: {
            street:'',
            city:'',
            zipcode:''
          }
        }
        setUsers([...users, newUser])
        break;
      }
    }
    setRightDisplay('none')
  }

  const addPostCallback = (action: 'cancel' | 'add' | string, title: string, body: string) => {
    switch(action){
      case 'cancel':
        break;
      case 'add':
        setPosts([...posts,{
          id: posts[posts.length-1].id + 1,
          userId: selectedUser,
          title: title,
          body: body,
        }])
        break;
    }
  }

  const addTaskCallback = (action: 'cancel' | 'add' | string, title: string): void => {
    switch(action){
      case 'cancel':
        break;
      case 'add':
        setTasks([...tasks,{
          id: tasks[tasks.length-1].id + 1,
          userId: selectedUser,
          title: title,
          completed: false
        }])
        break;
      }
  }

  const userActionsCallback = async (action: 'select' | 'update' | 'delete' | string, user: JPHTypes.User) => {
    switch(action){
      case 'select':
        setSelectedUser(user.id)
        setRightDisplay('userLists')
        break
      case 'update': {
        const updatedUsers = users.map(
          (u: JPHTypes.User) => {
            if(u.id == user.id){
              return user
            }
            else{
              return u
            }
          }
        )
        setUsers(updatedUsers)
        const updateReponse = await utils.updateUser(user)
        console.debug("update user result: " + updateReponse)
        break;
      }
      case 'delete': {
        const deleteResponse = await utils.deleteUser(user.id)
        console.debug("delete user result: " + deleteResponse)
        setUsers(users.filter((u: JPHTypes.User) => u.id != user.id))
        setPosts(posts.filter((p: JPHTypes.Post) => p.userId != user.id))
        setTasks(tasks.filter((t: JPHTypes.ToDo) => t.userId != user.id))
        if(selectedUser === user.id){
          setSelectedUser(-1)
          setRightDisplay('')
        }
        break;
      }
      default:
        break;
    }
  }

  const completeTaskCallback = (taskId: number) => {
    // complete specified task
    const updatedTasks = [...tasks]
    const taskIndex = updatedTasks.findIndex((task) => {return task.id == taskId})
    updatedTasks[taskIndex].completed = true
    setTasks(updatedTasks)
    console.debug(`Tasks updated. Task ${taskId} (idx: ${taskIndex}) was completed`)
  }
  //#endregion

  const showAddUserDialog = () => {
    setRightDisplay('addUser')
  }

  return (
    <div className='base'>
      <div className='pane main'>
        <div className='main-top'>
          <label htmlFor="search">Search: </label><input type="text" title="search" className='main-top--search' onChange={(e) => setSearchPhrase(e.target.value)} />
          <button type='button' onClick={showAddUserDialog}>Add</button>
        </div>
        <UsersList users={filteredUsers} userActionsCallback={userActionsCallback} selectedUserId={selectedUser} />
      </div>
      <div className='pane secondary'>
      {
        rightDisplay === 'userLists' &&
        <div className='lists'>
          <TasksList tasks={filteredTasks} addTaskCallback={addTaskCallback} completeTaskCallback={completeTaskCallback} />
          <PostsList posts={filteredPosts} addPostCallback={addPostCallback} />
        </div>
      }
      {
        rightDisplay === 'addUser' &&
        <div>
          <UserAdd onClick={addUserCallback} />
        </div>
      }
      </div>
    </div>
  )
}

export default App

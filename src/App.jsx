import { useState, useEffect } from 'react'
import './App.css'
import utils from './utils.js'
import UsersList from './components/UsersList.jsx'
import PostsList from './components/PostsList.jsx'
import TasksList from './components/TasksList.jsx'
import UserAdd from './components/UserAdd.jsx'

function App() {
  //#region useStates
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [tasks, setTasks] = useState([])

  const [searchPhrase, setSearchPhrase] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  
  const [selectedUser, setSelectedUser] = useState('')
  const [rightDisplay,setRightDisplay] = useState('')
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
    // runs everytime the states of 'users' or 'searchPhrase' changes
    console.debug("users,searchPhrase => (useEffect) filteredUsers")
    const searchResults = users.filter(
      (user) => {
        return user.name.toLowerCase().includes(searchPhrase) || 
               user.email.toLowerCase().includes(searchPhrase)
      }
    )
    setFilteredUsers(searchResults) // since this is not an async function we can set state here under useEffect block
  }, [users,searchPhrase])

  useEffect(() => {
    /*
    runs everytime the state of 'tasks' list is updated
    updates the state of 'users' list with property 'isAllTasksCompleted'
    */
    console.debug("tasks => (useeffect) users")
    const updatedUsers = users.map(
      (user) => {
        // gets the list of all uncompleted tasks and if there are none set property to "true"
        const uncompletedTasks = tasks.filter((task) => {
          return task.userId == user.id && !task.completed
        })
        const updatedUser = {...user, isAllTasksCompleted: uncompletedTasks.length === 0}
        return updatedUser
      }
    )
    setUsers(updatedUsers)
    console.debug("count of free users: " + users.filter(user => {return user.isAllTasksCompleted}).length)
  },[tasks])
  //#endregion

  //#region callbacks
  const addUserCallback = (e,name,email) => {
    switch(e){
      case 'cancel':
        break;
      case 'add':
        setUsers([...users,{
          id: users[users.length-1].id + 1,
          name: name,
          email: email,
          isAllTasksCompleted: true
        }])
        break;
      }
    setRightDisplay('none')
  }

  const addPostCallback = (e,title,body) => {
    switch(e){
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

  const addTaskCallback = (e,title) => {
    switch(e){
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

  const userActionsCallback = async (action,user) => {
    switch(action){
      case 'select':
        setSelectedUser(user.id)
        setRightDisplay('userLists')
        break
      case 'update':
        const updatedUsers = users.map(
          (u) => {
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
      case 'delete':
        const deleteResponse = await utils.deleteUser(user.id)
        console.debug("delete user result: " + deleteResponse)
        setUsers(users.filter((u) => {return u.id != user.id}))
        setPosts(posts.filter((p) => {return p.userId != user.id}))
        setTasks(tasks.filter((t) => {return t.userId != user.id}))
        if(selectedUser == user.id){
          setSelectedUser('')
          setRightDisplay('')
        }
        break;
      default:
        break;
    }
  }

  const completeTaskCallback = (taskId) => {
    // complete specified task
    const updatedTasks = [...tasks]
    const taskIndex = updatedTasks.findIndex((task) => {return task.id == taskId})
    updatedTasks[taskIndex].completed = true
    setTasks(updatedTasks)
    console.debug(`Tasks updated. Task ${taskId} (idx: ${taskIndex}) was completed`)
  }
  //#endregion

  const isOnRightDisplay = (element) => {
    return rightDisplay == element
  }

  const showAddUserDialog = () => {
    setRightDisplay('addUser')
  }

  return (
    <div>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td className='main-screen'>
              <div>
                Search: <input type="text" style={{width:'100px'}} onChange={(e) => setSearchPhrase(e.target.value)} />
                <span className='tab' />
                <button onClick={showAddUserDialog}>Add</button>
              </div>
              <br />      
              <UsersList users={filteredUsers} userActionsCallback={userActionsCallback} selectedUserId={selectedUser} />
            </td>
            <td>
              <div style={!isOnRightDisplay('userLists')?{display:'none'}:{}}>
                <TasksList tasks={tasks.filter((task)=>{return task.userId==selectedUser})} addTaskCallback={addTaskCallback} completeTaskCallback={completeTaskCallback} />
                <PostsList posts={posts.filter((post)=>{return post.userId==selectedUser})} addPostCallback={addPostCallback} />
              </div>
              <div style={!isOnRightDisplay('addUser')?{display:'none'}:{}}>
                <UserAdd addUserCallback={addUserCallback} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App

import axios from 'axios'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'
const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos'

const getAll = async (url) => {
    const {data} = await axios.get(url)
    return data
}

const getUsers = async () => {
    const {data} = await axios.get(USERS_URL)
    return data
}

const getTasks = async () => {
    const {data} = await axios.get(TODOS_URL)
    return data
}

const getPosts = async () => {
    const {data} = await axios.get(POSTS_URL)
    return data
}

const deleteUser = async (id) => {
    const response = await axios.delete(`${USERS_URL}/${id}`)
    return response.status === 200
}

const updateUser = async (user) => {
    const response = await axios.patch(`${USERS_URL}/${user.id}`,user)
    return response.status === 200
}

export default {getUsers, getTasks, getPosts, deleteUser, updateUser}
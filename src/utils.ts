import axios from 'axios'
import { User, Post, ToDo } from './types'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'
const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos'

const getAll = async (url: string): Promise<(User | Post | ToDo)[]> => {
    const {data} = await axios.get(url)
    return data
}

const getUsers = async (): Promise<User[]> => {
    const {data} = await axios.get(USERS_URL)
    return data
}

const getTasks = async (): Promise<ToDo[]> => {
    const {data} = await axios.get(TODOS_URL)
    return data
}

const getPosts = async (): Promise<Post[]> => {
    const {data} = await axios.get(POSTS_URL)
    return data
}

const deleteUser = async (id: number): Promise<boolean> => {
    const response = await axios.delete(`${USERS_URL}/${id}`)
    return response.status === 200
}

const updateUser = async (user: User): Promise<boolean> => {
    const response = await axios.patch(`${USERS_URL}/${user.id}`,user)
    return response.status === 200
}

export default {getAll, getUsers, getTasks, getPosts, deleteUser, updateUser}
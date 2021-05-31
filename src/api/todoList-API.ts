import axios from "axios";
import {TaskStatuses} from "../reducers/tasks-reducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'b9ca9bb3-c4d5-4d4a-a9b8-46e44fce672e'
    }
})


export const toDoListAPI = {
    getToDoList () {
      return instance.get('/todo-lists')
    },
    removeTodoList (toDoListID: string) {
        return instance.delete(`/todo-lists/${toDoListID}`)
    },
    addToDoList (title: string) {
        return instance.post('/todo-lists/', {title})
    },
    changeToDoListTitle (toDoListID: string, title: string) {
        return instance.put(`/todo-lists/${toDoListID}`, {title})
    },
    getTasks(toDoListID: string) {
        return instance.get(`/todo-lists/${toDoListID}/tasks`)
    },
    removeTask (toDoListID: string, taskID: string) {
        return instance.delete(`/todo-lists/${toDoListID}/tasks/${taskID}`)
    },
    addTask (toDoListID: string, title: string) {
        return instance.post(`/todo-lists/${toDoListID}/tasks`, {title})
    },
    changeTaskTitle (toDoListID: string, payLoad: RequestPayLoadChangeTaskType, taskID: string) {
        return instance.put(`/todo-lists/${toDoListID}/tasks/${taskID}`, payLoad)
    },
}

export type RequestPayLoadChangeTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: number
    startDate: string
    deadline: string
}

export type ChangingPropertyRequestPayLoadChangeTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: number
    startDate?: string
    deadline?: string
}
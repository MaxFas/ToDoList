import axios from "axios";
import {TasksFromServerType, TaskStatuses} from "../reducers/tasks-reducer";
import {ToDoListsFromServerType} from "../reducers/todoList-reducer";

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
        return instance.delete<ResponseType>(`/todo-lists/${toDoListID}`)
    },
    addToDoList (title: string) {
        return instance.post<ResponseType<{item: ToDoListsFromServerType}>>('/todo-lists/', {title})
    },
    changeToDoListTitle (toDoListID: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${toDoListID}`, {title})
    },
    getTasks(toDoListID: string) {
        return instance.get(`/todo-lists/${toDoListID}/tasks`)
    },
    removeTask (toDoListID: string, taskID: string) {
        return instance.delete<ResponseType>(`/todo-lists/${toDoListID}/tasks/${taskID}`)
    },
    addTask (toDoListID: string, title: string) {
        return instance.post<ResponseType<{ item: TasksFromServerType }>>(`/todo-lists/${toDoListID}/tasks`, {title})
    },
    changeTask (toDoListID: string, payLoad: RequestPayLoadChangeTaskType, taskID: string) {
        return instance.put(`/todo-lists/${toDoListID}/tasks/${taskID}`, payLoad)
    },
}

export const authAPI = {
    login(personalData: LoginRequestType) {
        return instance.post<ResponseType<{userID: number}>>(`/auth/login`, personalData)
    },
    logout() {
        return instance.delete<ResponseType>(`/auth/login`)
    },
    me() {
        return instance.get<ResponseType<AuthMeType>>(`/auth/me`)
    }
}


export type AuthMeType = {
    id: number
    email: string
    login: string
}

export type LoginRequestType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
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

export type ResponseType<T={}> = {
    resultCode: number
    messages: Array<string>
    data:T
}
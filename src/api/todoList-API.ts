import axios from "axios";
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
        return instance.delete(`/todo-lists/${toDoListID}`)
    },
    addToDoList (toDoListID: string, title: string) {
        return instance.post('/todo-lists/', {title})
    },
    changeToDoListTitle (toDoListID: string, title: string) {
        return instance.put(`/todo-lists/${toDoListID}`)
    },
    getTasks(toDoListID: string) {
        return instance.get(`/todo-lists/${toDoListID}/tasks`)
    }
}
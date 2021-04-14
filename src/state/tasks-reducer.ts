import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddToDoListActionType, RemoveToDoListActionType} from "./todoList-reducer";

type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskID: string
    todoListID: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE-STATUS'
    taskID: string
    isDone: boolean
    todoListID: string
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TITLE'
    taskID: string
    title: string
    todoListID: string
}


type ActionsTypes = RemoveTaskActionType|AddTaskActionType|ChangeTaskStatusActionType|
    ChangeTaskTitleActionType|AddToDoListActionType|RemoveToDoListActionType

let initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsTypes)  => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let copyState = {...state}
            copyState[action.todoListID] = state[action.todoListID].filter(t => t.id !== action.taskID)
            return copyState
        }
        case "ADD-TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {...state, [action.todoListID]: [newTask, ...state[action.todoListID]]}
        }
        case "CHANGE-STATUS": {

            return {...state, [action.todoListID]: state[action.todoListID].map(t=> {
                if (t.id===action.taskID){
                    return {...t, isDone: action.isDone}
                } else {
                    return t
                }
                })}
        }
        case "CHANGE-TITLE": {
            return {...state, [action.todoListID]: state[action.todoListID].map(t=> {
                    if (t.id===action.taskID){
                        return {...t, title: action.title}
                    } else {
                        return t
                    }
                })}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.toDoListID]: []}
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.toDoListID]
            return {...copyState}
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskID, todoListID}
}
export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todoListID}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-STATUS", taskID, isDone, todoListID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TITLE", taskID, title, todoListID}
}

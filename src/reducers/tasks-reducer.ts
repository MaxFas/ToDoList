import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddToDoListActionType, GetToDoListsActionType, RemoveToDoListActionType} from "./todoList-reducer";
import {toDoListAPI} from "../api/todoList-API";
import {Dispatch} from "redux";

let initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsTypes)  => {
    switch (action.type) {
        case "GET-TASKS": {
            return {...state, [action.toDoListID]: action.tasks}
        }
        case "GET-TODOLISTS": {
            const copyState = {...state}
            action.toDoLists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "REMOVE-TASK": {
            let copyState = {...state}
            copyState[action.todoListID] = state[action.todoListID].filter(t => t.id !== action.taskID)
            return copyState
        }
        case "ADD-TASK": {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
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
            return {...state, [action.toDoList.id]: []}
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
export const getTasks = (tasks: TasksFromServerType[], toDoListID: string) => {
    return {type: "GET-TASKS", tasks, toDoListID} as const
}
export const removeTaskAC = (taskID: string, todoListID: string) => {
    return {type: "REMOVE-TASK", taskID, todoListID} as const
}
export const addTaskAC = (task: TasksFromServerType) => {
    return {type: "ADD-TASK", task}  as const
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string) => {
    return {type: "CHANGE-STATUS", taskID, isDone, todoListID}  as const
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string) => {
    return {type: "CHANGE-TITLE", taskID, title, todoListID} as const
}

export const getTasksTC = (toDoListID: string) => (dispatch: Dispatch) => {
    toDoListAPI.getTasks(toDoListID)
        .then(res=> dispatch(getTasks(res.data.items, toDoListID)))
}

export const addTaskTC = (toDoListID: string, title: string) => (dispatch: Dispatch) => {
    toDoListAPI.addTask(toDoListID, title)
        .then(res => dispatch(addTaskAC(res.data.data.item)))
}

export const removeTaskTC = (toDoListID: string) => (dispatch: Dispatch) => {
    toDoListAPI.getTasks(toDoListID)
        .then(res=> dispatch(getTasks(res.data.items, toDoListID)))
}

export const changeTaskTitleTC = (toDoListID: string) => (dispatch: Dispatch) => {
    toDoListAPI.getTasks(toDoListID)
        .then(res=> dispatch(getTasks(res.data.items, toDoListID)))
}


type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type GetTasksActionType = ReturnType<typeof getTasks>

export type TasksFromServerType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: number
    deadline: number
    id: string
    todoListId: string
    order: number
    addedDate: number
}


type ActionsTypes = RemoveTaskActionType|AddTaskActionType|ChangeTaskStatusActionType|
    ChangeTaskTitleActionType|AddToDoListActionType|RemoveToDoListActionType|GetToDoListsActionType
|GetTasksActionType

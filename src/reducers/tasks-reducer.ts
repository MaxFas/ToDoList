
import {AddToDoListActionType, GetToDoListsActionType, RemoveToDoListActionType} from "./todoList-reducer";
import {
    ChangingPropertyRequestPayLoadChangeTaskType,
    RequestPayLoadChangeTaskType,
    toDoListAPI
} from "../api/todoList-API";
import {Dispatch} from "redux";
import {AppRootStateType} from "../state/store";

export type TasksStateType = {
    [key: string]: Array<TasksFromServerType>
}

let initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsTypes):TasksStateType  => {
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
        case "CHANGE-TASK": {
            return {...state, [action.task.todoListId]: state[action.task.todoListId].map(t=> {
                    if (t.id===action.task.id){
                        return {...t, ...action.changingProperty}
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
export const removeTask = (todoListID: string, taskID: string ) => {
    return {type: "REMOVE-TASK", taskID, todoListID} as const
}
export const addTask = (task: TasksFromServerType) => {
    return {type: "ADD-TASK", task}  as const
}
export const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
    return {type: "CHANGE-STATUS", taskID, isDone, todoListID}  as const
}
export const changeTask = (task: TasksFromServerType, changingProperty: ChangingPropertyRequestPayLoadChangeTaskType) => {
    return {type: "CHANGE-TASK", task, changingProperty} as const
}

export const getTasksTC = (toDoListID: string) => (dispatch: Dispatch) => {
    toDoListAPI.getTasks(toDoListID)
        .then(res=> dispatch(getTasks(res.data.items, toDoListID)))
}

export const addTaskTC = (toDoListID: string, title: string) => (dispatch: Dispatch) => {
    toDoListAPI.addTask(toDoListID, title)
        .then(res => dispatch(addTask(res.data.data.item)))
}

export const removeTaskTC = (toDoListID: string, taskID: string) => (dispatch: Dispatch) => {
    toDoListAPI.removeTask(toDoListID, taskID)
        .then(res=> dispatch(removeTask(toDoListID, taskID)))
}

export const changeTaskTC = (toDoListID: string, taskID: string, changingProperty:ChangingPropertyRequestPayLoadChangeTaskType) =>
    (dispatch: Dispatch, getState: ()=> AppRootStateType) => {

    const state = getState()
    const task = state.tasks[toDoListID].find(t => t.id === taskID)
    if (!task) {
        console.warn('task not found in the state')
        return
    }
    let taskForServer: RequestPayLoadChangeTaskType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...changingProperty
    }
    toDoListAPI.changeTaskTitle(toDoListID, taskForServer, taskID)
        .then(res=> dispatch(changeTask(res.data.data.item, changingProperty)))
}


type RemoveTaskActionType = ReturnType<typeof removeTask>
type AddTaskActionType = ReturnType<typeof addTask>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatus>
type ChangeTaskTitleActionType = ReturnType<typeof changeTask>
type GetTasksActionType = ReturnType<typeof getTasks>

export type TasksFromServerType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: number
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}


type ActionsTypes = RemoveTaskActionType|AddTaskActionType|ChangeTaskStatusActionType|
    ChangeTaskTitleActionType|AddToDoListActionType|RemoveToDoListActionType|GetToDoListsActionType
|GetTasksActionType

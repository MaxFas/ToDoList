import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";
import {toDoListAPI} from "../api/todoList-API";
import {Dispatch} from "redux";


let initialState: Array<ToDoListType> = []

export const toDoListReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "GET-TODOLISTS":
            return [...action.toDoLists.map(tl=> {
                return {...tl, filter: 'all'}
            })]
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.toDoListID)
        case "ADD-TODOLIST":
            const newToDoList: ToDoListType = {id: action.toDoListID, title: action.title, filter: "all"}
            return [...state, newToDoList]
        case "CHANGE-TODOLIST-TITLE": {
            const toDoList = state.find(tl => tl.id === action.toDoListID)
            if (toDoList) {
                toDoList.title = action.newTitle
                return [...state]
            }
            return state
        }
        case "CHANGE-TODOLIST-FILTER": {
            const toDoList = state.find(tl => tl.id === action.toDoListID)
            if (toDoList) {
                toDoList.filter = action.newFilterValue
                return [...state]
            }
            return state
        }
        default:
            return state
    }
}

export const removeToDoListAC = (toDoListID: string) => {
    return {type: "REMOVE-TODOLIST", toDoListID} as const
}
export const addToDoListAC = (title: string) => {
    return {type: "ADD-TODOLIST", title, toDoListID: v1()} as const
}
export const changeDoListFilterAC = ( newFilterValue: FilterValuesType, toDoListID: string)=> {
    return {type:"CHANGE-TODOLIST-FILTER", newFilterValue, toDoListID} as const
}
export const changeDoListTitleAC = (toDoListID: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", toDoListID, newTitle: title} as const
}
export const getToDoLists = (toDoLists:Array<ToDoListsFromServerType>) => {
    return {type: "GET-TODOLISTS", toDoLists} as const
}


export type RemoveToDoListActionType = ReturnType<typeof removeToDoListAC>
export type AddToDoListActionType = ReturnType<typeof addToDoListAC>
export type ChangeDoListFilterActionType = ReturnType<typeof changeDoListFilterAC>
export type ChangeDoListTitleActionType = ReturnType<typeof changeDoListTitleAC>
export type GetToDoListsActionType = ReturnType<typeof getToDoLists>

export const getToDoListsTC = () => (dispatch: Dispatch) => {
    toDoListAPI.getToDoList()
        .then(res => dispatch(getToDoLists(res.data)))
}

export type ToDoListsFromServerType = {
    id: string
    addedDate: number
    order: number
    title: string
}


type ActionType =
    RemoveToDoListActionType
    | AddToDoListActionType
    | ChangeDoListFilterActionType
    | ChangeDoListTitleActionType
|GetToDoListsActionType

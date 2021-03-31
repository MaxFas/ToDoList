import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";

export type RemoveToDoListActionType = {
    type: 'REMOVE-TODOLIST'
    toDoListID: string
}
export type AddToDoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    toDoListID: string
}
export type ChangeDoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    toDoListID: string
    newFilterValue: FilterValuesType
}
export type ChangeDoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    toDoListID: string
    newTitle: string
}


type ActionType =
    RemoveToDoListActionType
    | AddToDoListActionType
    | ChangeDoListFilterActionType
    | ChangeDoListTitleActionType

export const toDoListReducer = (state: Array<ToDoListType>, action: ActionType) => {
    switch (action.type) {
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

export const RemoveToDoListAC = (toDoListID: string): RemoveToDoListActionType => {
    return {type: "REMOVE-TODOLIST", toDoListID}
}
export const AddToDoListAC = (title: string): AddToDoListActionType => {
    return {type: "ADD-TODOLIST", title, toDoListID: v1()}
}
export const ChangeDoListFilterAC = ( newFilterValue: FilterValuesType, toDoListID: string): ChangeDoListFilterActionType => {
    return {type:"CHANGE-TODOLIST-FILTER", newFilterValue, toDoListID}
}
export const ChangeDoListTitleAC = (toDoListID: string, title: string): ChangeDoListTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", toDoListID, newTitle: title}
}
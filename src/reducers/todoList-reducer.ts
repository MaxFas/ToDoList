import {FilterValuesType} from "../AppWithRedux";
import {toDoListAPI} from "../api/todoList-API";
import {Dispatch} from "redux";
import {isLoading, setError} from "./app-reducer";


let initialState: Array<ToDoListType> = []

export const toDoListReducer = (state = initialState, action: ActionType): Array<ToDoListType> => {
    switch (action.type) {
        case "GET-TODOLISTS":
            return action.toDoLists.map(tl => ({...tl, filter: 'all', isExisting: true}))
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.toDoListID)
        case "ADD-TODOLIST":
            return [...state, {...action.toDoList, filter: 'all', isExisting: true}]
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.toDoListID? {...tl, title: action.newTitle}: tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            const toDoList = state.find(tl => tl.id === action.toDoListID)
            if (toDoList) {
                toDoList.filter = action.newFilterValue
                return [...state]
            }
            return state
        }
        case "CHANGE-EXIST-STATUS": {
            const toDoList = state.find(tl => tl.id === action.toDoListID)
            if (toDoList) {
                toDoList.isExisting = action.isExisting
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
export const addToDoListAC = (toDoList: ToDoListsFromServerType) => {
    return {type: "ADD-TODOLIST", toDoList} as const
}
export const changeDoListFilterAC = (newFilterValue: FilterValuesType, toDoListID: string) => {
    return {type: "CHANGE-TODOLIST-FILTER", newFilterValue, toDoListID} as const
}
export const changeDoListTitleAC = (toDoListID: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", toDoListID, newTitle: title} as const
}
export const getToDoLists = (toDoLists: Array<ToDoListsFromServerType>) => {
    return {type: "GET-TODOLISTS", toDoLists} as const
}
export const changeExistStatus = (isExisting: false, toDoListID: string) => {
    return {type: "CHANGE-EXIST-STATUS", isExisting, toDoListID} as const
}


export type RemoveToDoListActionType = ReturnType<typeof removeToDoListAC>
export type AddToDoListActionType = ReturnType<typeof addToDoListAC>
export type ChangeDoListFilterActionType = ReturnType<typeof changeDoListFilterAC>
export type ChangeDoListTitleActionType = ReturnType<typeof changeDoListTitleAC>
export type GetToDoListsActionType = ReturnType<typeof getToDoLists>
export type ChangeExistStatusType = ReturnType<typeof changeExistStatus>

export const getToDoListsTC = () => (dispatch: Dispatch) => {
    toDoListAPI.getToDoList()
        .then(res => dispatch(getToDoLists(res.data)))
}

export const addToDoListsTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(isLoading(true))
    toDoListAPI.addToDoList(title)
        .then(res => {
            debugger
            if (res.data.resultCode === 0) {
                dispatch(addToDoListAC(res.data.data.item))
            } else {
                dispatch(setError(res.data.messages[0]))
            }
            dispatch(isLoading(false))
        })
}
export const removeToDoListsTC = (toDoListID: string) => (dispatch: Dispatch) => {
    dispatch(isLoading(true))
    dispatch(changeExistStatus(false, toDoListID))
    toDoListAPI.removeTodoList(toDoListID)
        .then(res => {
            dispatch(removeToDoListAC(toDoListID))
            dispatch(isLoading(false))
        })
}

export const changeToDoListsTitleTC = (toDoListID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(isLoading(true))
    toDoListAPI.changeToDoListTitle(toDoListID, title)
        .then(res => {
            dispatch(changeDoListTitleAC(toDoListID, title))
            dispatch(isLoading(false))
        })
}

export type ToDoListsFromServerType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ToDoListType = ToDoListsFromServerType & { filter: FilterValuesType, isExisting: boolean }

type ActionType =
    RemoveToDoListActionType
    | AddToDoListActionType
    | ChangeDoListFilterActionType
    | ChangeDoListTitleActionType
    | GetToDoListsActionType
    | ChangeExistStatusType

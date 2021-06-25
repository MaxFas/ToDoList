import {Dispatch} from 'redux'
import {authAPI, LoginRequestType} from "../api/todoList-API";
import {AppActionsType, isLoading, setError} from "./app-reducer";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const loginTC = (data: LoginRequestType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(isLoading(true))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            } else {
                dispatch(setError(res.data.messages[0]))
            }
        })
    dispatch(isLoading(false))
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    debugger
    dispatch(isLoading(true))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
            } else {
                dispatch(setError(res.data.messages[0]))
            }
        })
    dispatch(isLoading(false))
}


type ActionsType = ReturnType<typeof setIsLoggedInAC> | AppActionsType
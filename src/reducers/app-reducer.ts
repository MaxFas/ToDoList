import {authAPI} from "../api/todoList-API";
import {Dispatch} from "redux";
import {setIsLoggedInAC} from "./auth-reducer";

const initialState = {
    loading: false,
    error: null as null| string,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/IS-LOADING':
            return {...state, loading: action.loading}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
            case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const isLoading = (loading: boolean) => ({type: 'APP/IS-LOADING', loading}) as const
export const setError = (error: null|string) => ({type: 'APP/SET-ERROR', error}) as const
export const setInitialized = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZED', isInitialized}) as const

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        }
    })
        .finally(()=> {
            dispatch(setInitialized(true))
        })
}




export type AppActionsType = isLoadingType|setErrorType|setInitializedType
type isLoadingType = ReturnType<typeof isLoading>
type setErrorType = ReturnType<typeof setError>
type setInitializedType = ReturnType<typeof setInitialized>
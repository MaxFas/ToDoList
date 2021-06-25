
const initialState = {
    loading: false,
    error: null as null| string,
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/IS-LOADING':
            return {...state, loading: action.loading}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const isLoading = (loading: boolean) => ({type: 'APP/IS-LOADING', loading}) as const
export const setError = (error: null|string) => ({type: 'APP/SET-ERROR', error}) as const




type ActionsType = isLoadingType|setErrorType
type isLoadingType = ReturnType<typeof isLoading>
type setErrorType = ReturnType<typeof setError>
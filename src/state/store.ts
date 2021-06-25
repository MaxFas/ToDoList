import {tasksReducer} from '../reducers/tasks-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {toDoListReducer} from "../reducers/todoList-reducer";
import thunk from 'redux-thunk';
import {appReducer} from "../reducers/app-reducer";
import {authReducer} from "../reducers/auth-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: toDoListReducer,
    app: appReducer,
    auth: authReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>
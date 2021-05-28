import {tasksReducer} from '../reducers/tasks-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {toDoListReducer} from "../reducers/todoList-reducer";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: toDoListReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>
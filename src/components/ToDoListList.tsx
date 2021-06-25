import React, {useCallback, useEffect} from 'react';
import TodoList from "./../components/TodoList";
import AddItemForm from "./../components/AddItemForm";
import {
    Container,
    Grid,
    Paper,
} from "@material-ui/core";
import {
    addToDoListsTC,
    changeDoListFilterAC,
    changeToDoListsTitleTC, getToDoListsTC,
    removeToDoListsTC, ToDoListType,
} from "../reducers/todoList-reducer";
import {
    addTaskTC,
    changeTaskTC,
    removeTaskTC, TasksStateType, TaskStatuses
} from "../reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";

export type TaskType = {
    title: string
    id: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export function ToDoListList() {


    useEffect(()=>{
        dispatch(getToDoListsTC())
    }, [])

    let toDoLists = useSelector<AppRootStateType, ToDoListType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    let dispatch = useDispatch()

    const removeTask = useCallback((taskId: string, toDoListID: string)=> {
        dispatch(removeTaskTC(toDoListID, taskId))
    }, [dispatch])
    const addTask = useCallback((title: string, toDoListID: string) => {
        dispatch(addTaskTC(toDoListID, title))
    }, [dispatch])
    const changeTaskStatus =useCallback((taskID: string, status: TaskStatuses, toDoListID: string)=> {
        dispatch(changeTaskTC(toDoListID, taskID, {status}))
    }, [dispatch])
    const changeTaskTitle =useCallback((taskID: string, newTitle: string, toDoListID: string)=> {
        dispatch(changeTaskTC(toDoListID, taskID, {title: newTitle}))
    }, [dispatch])
    const changeFilter =useCallback((newFilterValue: FilterValuesType, toDoListID: string)=> {
        let action = changeDoListFilterAC(newFilterValue, toDoListID)
        dispatch(action)
    }, [dispatch])
    const changeTitle =useCallback((newTitle: string, toDoListID: string)=> {
        dispatch(changeToDoListsTitleTC(toDoListID, newTitle))
    }, [dispatch])
    const removeToDoList =useCallback((toDoListID: string)=> {
        dispatch(removeToDoListsTC(toDoListID))
    }, [dispatch])
    const addToDoList = useCallback((title: string) => {
        dispatch(addToDoListsTC(title))
    }, [dispatch])

    const toDoListItems = toDoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: '20px'}}>
                    <TodoList removeToDoList={removeToDoList} toDoListID={tl.id} addTask={addTask} title={tl.title}
                              tasks={tasks[tl.id]} removeTask={removeTask} isExisting={tl.isExisting}
                              changeFilter={changeFilter} changeTaskStatus={changeTaskStatus} filter={tl.filter}
                              changeTitle={changeTitle} changeTaskTitle={changeTaskTitle}/>
                </Paper>
            </Grid>
        )
    })

    return (
            <Container fixed style={{padding: '20px'}}>
                <Grid container><AddItemForm addItem={addToDoList}/> </Grid>
                <Grid container spacing={4}>{toDoListItems}</Grid>
            </Container>
    );
}


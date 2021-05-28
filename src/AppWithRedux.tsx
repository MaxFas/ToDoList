import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addToDoListAC,
    changeDoListFilterAC,
    changeDoListTitleAC, getToDoListsTC,
    removeToDoListAC,
} from "./reducers/todoList-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    title: string
    id: string
    isDone: boolean
}
export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function AppWithRedux() {


    useEffect(()=>{
        dispatch(getToDoListsTC())
    }, [])

    let toDoLists = useSelector<AppRootStateType, ToDoListType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    let dispatch = useDispatch()

    const removeTask = useCallback((taskId: string, toDoListID: string)=> {
        let action = removeTaskAC(taskId, toDoListID)
        dispatch(action)
    }, [dispatch])
    const addTask = useCallback((title: string, toDoListID: string) => {
        let action = addTaskAC(title, toDoListID)
        dispatch(action)
    }, [dispatch])
    const changeTaskStatus =useCallback((taskID: string, isDone: boolean, toDoListID: string)=> {
        let action = changeTaskStatusAC(taskID, isDone, toDoListID)
        dispatch(action)
    }, [dispatch])
    const changeTaskTitle =useCallback((taskID: string, newTitle: string, toDoListID: string)=> {
        let action = changeTaskTitleAC(taskID, newTitle, toDoListID)
        dispatch(action)
    }, [dispatch])
    const changeFilter =useCallback((newFilterValue: FilterValuesType, toDoListID: string)=> {
        let action = changeDoListFilterAC(newFilterValue, toDoListID)
        dispatch(action)
    }, [dispatch])
    const changeTitle =useCallback((newTitle: string, toDoListID: string)=> {
        let action = changeDoListTitleAC(toDoListID, newTitle)
        dispatch(action)
    }, [dispatch])
    const removeToDoList =useCallback((toDoListID: string)=> {
        let action = removeToDoListAC(toDoListID)
        dispatch(action)
    }, [dispatch])
    const addToDoList = useCallback((title: string) => {
        let action = addToDoListAC(title)
        dispatch(action)
    }, [dispatch])

    const toDoListItems = toDoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: '20px'}}>
                    <TodoList removeToDoList={removeToDoList} toDoListID={tl.id} addTask={addTask} title={tl.title}
                              tasks={tasks[tl.id]} removeTask={removeTask}
                              changeFilter={changeFilter} changeTaskStatus={changeTaskStatus} filter={tl.filter}
                              changeTitle={changeTitle} changeTaskTitle={changeTaskTitle}/>
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed style={{padding: '20px'}}>
                <Grid container><AddItemForm addItem={addToDoList}/> </Grid>
                <Grid container spacing={4}>{toDoListItems}</Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

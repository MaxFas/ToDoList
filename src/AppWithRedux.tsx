import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addToDoListAC,
    changeDoListFilterAC,
    changeDoListTitleAC,
    removeToDoListAC,
} from "./state/todoList-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
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

    let toDoLists = useSelector<AppRootStateType, ToDoListType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()



    function removeTask(taskId: string, toDoListID: string) {
        let action = removeTaskAC(taskId, toDoListID)
        dispatch(action)
    }

    function addTask(title: string, toDoListID: string) {
        let action = addTaskAC(title, toDoListID)
        dispatch(action)
    }

    function changeTaskStatus(taskID: string, isDone: boolean, toDoListID: string) {
        let action = changeTaskStatusAC(taskID, isDone, toDoListID)
        dispatch(action)
    }

    function changeTaskTitle(taskID: string, newTitle: string, toDoListID: string) {
        let action = changeTaskTitleAC(taskID, newTitle, toDoListID)
        dispatch(action)
    }

    function changeFilter(newFilterValue: FilterValuesType, toDoListID: string) {
        let action = changeDoListFilterAC(newFilterValue, toDoListID)
        dispatch(action)
    }

    function changeTitle(newTitle: string, toDoListID: string) {
        let action = changeDoListTitleAC(toDoListID, newTitle)
        dispatch(action)
    }

    function removeToDoList(toDoListID: string) {
        let action = removeToDoListAC(toDoListID)
        dispatch(action)
    }

    function addToDoList(title: string) {
        let action = addToDoListAC(title)
        dispatch(action)
    }

    const toDoListItems = toDoLists.map(tl => {
        let tasksForToDoList = tasks[tl.id]
        if (tl.filter === 'active') {
            tasksForToDoList = tasksForToDoList.filter(t => !t.isDone)
        }
        if (tl.filter === 'completed') {
            tasksForToDoList = tasksForToDoList.filter(t => t.isDone)
        }
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: '20px'}}>
                    <TodoList removeToDoList={removeToDoList} toDoListID={tl.id} addTask={addTask} title={tl.title}
                              tasks={tasksForToDoList} removeTask={removeTask}
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

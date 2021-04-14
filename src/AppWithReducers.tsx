import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addToDoListAC,
    changeDoListFilterAC,
    changeDoListTitleAC,
    removeToDoListAC,
    toDoListReducer
} from "./state/todoList-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type TaskType = {
    title: string
    id: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function AppWithReducers() {

    const toDoListID1 = v1()
    const toDoListID2 = v1()

    let [toDoLists, dispatchToDoList] = useReducer(toDoListReducer, [
        {id: toDoListID1, title: 'what to learn?', filter: "all"},
        {id: toDoListID2, title: 'what to buy?', filter: "all"}
    ])

    let [tasks, dispatchSetTasks] = useReducer(tasksReducer, {
        [toDoListID1]: [
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'CSS', isDone: true}],
        [toDoListID2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Meat', isDone: true}]
    })

    function removeTask(taskId: string, toDoListID: string) {
        let action = removeTaskAC(taskId, toDoListID)
        dispatchSetTasks(action)
    }

    function addTask(title: string, toDoListID: string) {
        let action = addTaskAC(title, toDoListID)
        dispatchSetTasks(action)
    }

    function changeTaskStatus(taskID: string, isDone: boolean, toDoListID: string) {
        let action = changeTaskStatusAC(taskID, isDone, toDoListID)
        dispatchSetTasks(action)
    }

    function changeTaskTitle(taskID: string, newTitle: string, toDoListID: string) {
        let action = changeTaskTitleAC(taskID, newTitle, toDoListID)
        dispatchSetTasks(action)
    }

    function changeFilter(newFilterValue: FilterValuesType, toDoListID: string) {
        let action = changeDoListFilterAC(newFilterValue, toDoListID)
        dispatchToDoList(action)
    }

    function changeTitle(newTitle: string, toDoListID: string) {
        let action = changeDoListTitleAC(toDoListID, newTitle)
        dispatchToDoList(action)
    }

    function removeToDoList(toDoListID: string) {
        let action = removeToDoListAC(toDoListID)
        dispatchToDoList(action)
        dispatchSetTasks(action)
    }

    function addToDoList(title: string) {
        let action = addToDoListAC(title)
        dispatchToDoList(action)
        dispatchSetTasks(action)
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

export default AppWithReducers;

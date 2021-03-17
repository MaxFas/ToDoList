import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox} from "@material-ui/core";
import {IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

type TodoListPropsType = {
    toDoListID: string
    filter: FilterValuesType
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, toDoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, toDoListID: string) => void
    addTask: (title: string, toDoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, toDoListID: string) => void
    removeToDoList: (toDoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, toDoListID: string) => void
    changeTitle:(newTitle: string, toDoListID: string) => void
}

function TodoList(props: TodoListPropsType) {

    const addTask = (title: string) => props.addTask(title, props.toDoListID)
    const setAllFilter = () => props.changeFilter("all", props.toDoListID)
    const setActiveFilter = () => props.changeFilter("active", props.toDoListID)
    const setCompletedFilter = () => props.changeFilter("completed", props.toDoListID)
    const removeToDoList = () => props.removeToDoList(props.toDoListID)
    const changeTitle = (newTitle: string) => props.changeTitle(newTitle, props.toDoListID)

    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.toDoListID)
        const changeTaskStatus = (e:ChangeEvent<HTMLInputElement>)=>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.toDoListID)
        const changeTaskTitle = (newTitle: string)=>
            props.changeTaskTitle(t.id, newTitle, props.toDoListID)
        return (
            <li className={t.isDone? 'is-done': ''}>
                <Checkbox color={"primary"} checked={t.isDone}
                onChange={changeTaskStatus}/>
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })

    return (
        <div>
            <h3><EditableSpan title={props.title} changeTitle={changeTitle} />
            <IconButton onClick={removeToDoList}>
                <Delete/>
            </IconButton></h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", paddingLeft: '0'}}>
                {tasks}
            </ul>
            <div>
                <Button onClick={setAllFilter} variant={"contained"}
                        color={props.filter ==='all' ? 'secondary': 'primary'} size={"small"}>All</Button>
                <Button onClick={setActiveFilter} variant={"contained"}
                        color={props.filter ==='active' ? 'secondary': 'primary'} size={"small"} >Active</Button>
                <Button onClick={setCompletedFilter} variant={"contained"}
                        color={props.filter ==='completed' ? 'secondary': 'primary'} size={"small"}>Completed</Button>
            </div>
        </div>
    )
}

export default TodoList;
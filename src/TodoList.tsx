import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox} from "@material-ui/core";
import {IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from "./Task";

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

const TodoList = React.memo((props: TodoListPropsType) => {

    console.log('rerender')

    const addTask =  useCallback((title: string) => props.addTask(title, props.toDoListID), [props.addTask, props.toDoListID])
    const setAllFilter = useCallback(() => props.changeFilter("all", props.toDoListID), [props.toDoListID])
    const setActiveFilter = useCallback(() => props.changeFilter("active", props.toDoListID), [props.toDoListID])
    const setCompletedFilter = useCallback(() => props.changeFilter("completed", props.toDoListID), [props.toDoListID])
    const removeToDoList = useCallback(() => props.removeToDoList(props.toDoListID), [])
    const changeTitle = useCallback((newTitle: string) => props.changeTitle(newTitle, props.toDoListID), [props.changeTitle, props.toDoListID])

    let tasksForToDoList = props.tasks
    if (props.filter === 'active') {
        tasksForToDoList = tasksForToDoList.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForToDoList = tasksForToDoList.filter(t => t.isDone)
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} changeTitle={changeTitle} />
            <IconButton onClick={removeToDoList}>
                <Delete/>
            </IconButton></h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", paddingLeft: '0'}}>
                {tasksForToDoList.map(t=> <Task key={t.id} removeTask={props.removeTask} task={t} toDoListID={props.toDoListID}
                                           changeTaskStatus={props.changeTaskStatus} changeTaskTitle={props.changeTaskTitle}/>)}
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
})

export default TodoList;
import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";


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
                <input type="checkbox" checked={t.isDone}
                onChange={changeTaskStatus}/>
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })

    return (
        <div>
            <h3><EditableSpan title={props.title} changeTitle={changeTitle} /> <button onClick={removeToDoList}> X </button></h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks}
            </ul>
            <div>
                <button onClick={setAllFilter} className={props.filter ==='all' ? 'active': ''}>All</button>
                <button onClick={setActiveFilter} className={props.filter ==='active' ? 'active': ''}>Active</button>
                <button onClick={setCompletedFilter} className={props.filter ==='completed' ? 'active': ''}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;
import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";


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
}

function TodoList(props: TodoListPropsType) {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.toDoListID)
        } else {
            setError(true)
        }
     setTitle('')
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false)
    }
    const setAllFilter = () => props.changeFilter("all", props.toDoListID)
    const setActiveFilter = () => props.changeFilter("active", props.toDoListID)
    const setCompletedFilter = () => props.changeFilter("completed", props.toDoListID)
    const removeToDoList = () => props.removeToDoList(props.toDoListID)

    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.toDoListID)
        const changeTaskStatus = (e:ChangeEvent<HTMLInputElement>)=>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.toDoListID)
        return (
            <li className={t.isDone? 'is-done': ''}>
                <input type="checkbox" checked={t.isDone}
                onChange={changeTaskStatus}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })
    return (
        <div>
            <h3>{props.title} <button onClick={removeToDoList}> X </button></h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressAddTask}
                        className={error ? 'error': ''}/>
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>Title is required!</div>}
            </div>
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
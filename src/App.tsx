import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type TaskType = {
    title: string
    id: string
    isDone: boolean
}
type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const toDoListID1 = v1()
    const toDoListID2 = v1()

    const [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
        {id: toDoListID1, title: 'what to learn?', filter: "all"},
        {id: toDoListID2, title: 'what to buy?', filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [toDoListID1]: [
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'CSS', isDone: true},],
        [toDoListID2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Meat', isDone: true}]
    })

    function removeTask(taskId: string, toDoListID: string) {
        tasks[toDoListID] = tasks[toDoListID].filter(t => t.id !== taskId)
        setTasks({...tasks})
    }
    function addTask(title: string, toDoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }

        const toDoListTasks = tasks[toDoListID]
        tasks[toDoListID] = [newTask, ...toDoListTasks]
        setTasks({...tasks})
    }
    function changeTaskStatus(taskID: string, isDone: boolean, toDoListID: string) {
        const task = tasks[toDoListID].find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    function changeTaskTitle(taskID: string, newTitle: string, toDoListID: string) {
        const task = tasks[toDoListID].find(t => t.id === taskID)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }
    function changeFilter(newFilterValue: FilterValuesType, toDoListID: string) {
        const toDoList = toDoLists.find(tl => tl.id === toDoListID)
        if (toDoList) {
            toDoList.filter = newFilterValue
            setToDoLists([...toDoLists])
        }
    }
    function changeTitle(newTitle: string, toDoListID: string) {
        const toDoList = toDoLists.find(tl => tl.id === toDoListID)
        if (toDoList) {
            toDoList.title = newTitle
            setToDoLists([...toDoLists])
        }
    }
    function removeToDoList(toDoListID: string) {
        setToDoLists(toDoLists.filter(tl=> tl.id!==toDoListID))
        delete tasks[toDoListID]
    }
    function addToDoList(title: string) {
        const newToDoListID = v1()
        const toDoList: ToDoListType = {id:newToDoListID,title, filter: "all"}
        setToDoLists([...toDoLists, toDoList])
        setTasks({...tasks, [newToDoListID]: []})
    }

const toDoListItems = toDoLists.map(tl=> {
    let tasksForToDoList = tasks[tl.id]
    if (tl.filter === 'active') {
        tasksForToDoList = tasksForToDoList.filter(t => !t.isDone)
    }
    if (tl.filter === 'completed') {
        tasksForToDoList = tasksForToDoList.filter(t => t.isDone)
    }
    return (
        <TodoList removeToDoList={removeToDoList} toDoListID={tl.id} addTask={addTask} title={tl.title}
                  tasks={tasksForToDoList} removeTask={removeTask}
                  changeFilter={changeFilter} changeTaskStatus={changeTaskStatus} filter={tl.filter} changeTitle={changeTitle} changeTaskTitle={changeTaskTitle}/>
    )
})

    return (
        <div className="App">
            <AddItemForm addItem={addToDoList}/>
            {toDoListItems}
        </div>
    );
}

export default App;

import React, {useCallback, useEffect} from "react";
import {FilterValuesType, TaskType} from "./AppWithRedux";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button} from "@material-ui/core";
import {IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from "./Task";
import {getTasksTC, TasksFromServerType, TasksStateType, TaskStatuses} from "./reducers/tasks-reducer";
import {useDispatch} from "react-redux";

type TodoListPropsType = {
    toDoListID: string
    filter: FilterValuesType
    title: string
    tasks: Array<TasksFromServerType>
    removeTask: (taskId: string, toDoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, toDoListID: string) => void
    addTask: (title: string, toDoListID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses, toDoListID: string) => void
    removeToDoList: (toDoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, toDoListID: string) => void
    changeTitle:(newTitle: string, toDoListID: string) => void
}

const TodoList:React.FC<TodoListPropsType> = React.memo((props) => {

    const dispatch = useDispatch()

   const {toDoListID,
       filter,
       title,
       tasks,
       removeTask,
       changeFilter,
       addTask,
       changeTaskStatus,
       removeToDoList,
       changeTaskTitle,
       changeTitle} = props

    useEffect(()=> {
        dispatch(getTasksTC(toDoListID))
    }, [])

    const addTaskCallBack =  useCallback((title: string) => addTask(title, toDoListID), [addTask, toDoListID])
    const setAllFilter = useCallback(() => changeFilter("all", toDoListID), [toDoListID])
    const setActiveFilter = useCallback(() => changeFilter("active", toDoListID), [toDoListID])
    const setCompletedFilter = useCallback(() => changeFilter("completed", toDoListID), [toDoListID])
    const removeToDoListCallBack = useCallback(() => removeToDoList(toDoListID), [])
    const changeTitleCallBack = useCallback((newTitle: string) => changeTitle(newTitle, toDoListID), [changeTitle, toDoListID])

    let tasksForToDoList = tasks
    if (filter === 'active') {
        tasksForToDoList = tasksForToDoList.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForToDoList = tasksForToDoList.filter(t => t.status === TaskStatuses.Completed)
    }

    const removeTaskCallBack  = (taskID: string) => removeTask(taskID, toDoListID)
    const changeTaskStatusCallBack  = (taskID: string, status: TaskStatuses)=>
        changeTaskStatus(taskID, status, toDoListID)
    const changeTaskTitleCallBack  = (taskID: string, newTitle: string)=>
        changeTaskTitle(taskID, newTitle, props.toDoListID)

    return (
        <div>
            <h3><EditableSpan title={title} changeTitle={changeTitleCallBack} />
            <IconButton onClick={removeToDoListCallBack}>
                <Delete/>
            </IconButton></h3>
            <AddItemForm addItem={addTaskCallBack}/>
            <ul style={{listStyle: "none", paddingLeft: '0'}}>
                {tasksForToDoList.map(t=> <Task key={t.id} removeTask={removeTaskCallBack} task={t}
                                           changeTaskStatus={changeTaskStatusCallBack} changeTaskTitle={changeTaskTitleCallBack}/>)}
            </ul>
            <div>
                <Button onClick={setAllFilter} variant={"contained"}
                        color={filter ==='all' ? 'secondary': 'primary'} size={"small"}>All</Button>
                <Button onClick={setActiveFilter} variant={"contained"}
                        color={filter ==='active' ? 'secondary': 'primary'} size={"small"} >Active</Button>
                <Button onClick={setCompletedFilter} variant={"contained"}
                        color={filter ==='completed' ? 'secondary': 'primary'} size={"small"}>Completed</Button>
            </div>
        </div>
    )
})

export default TodoList;
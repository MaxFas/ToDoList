import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";

type TaskPropsType = {
    toDoListID: string
    task: TaskType
    removeTask: (taskId: string, toDoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, toDoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, toDoListID: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    const removeTask = useCallback(() => props.removeTask(props.task.id, props.toDoListID), [props.task.id, props.removeTask])
    const changeTaskStatus = useCallback((e:ChangeEvent<HTMLInputElement>)=>
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.toDoListID), [props.task.id, props.changeTaskStatus])
    const changeTaskTitle = useCallback((newTitle: string)=>
        props.changeTaskTitle(props.task.id, newTitle, props.toDoListID), [props.task.id, props.changeTaskTitle])

    return (
        <li key={props.task.id} className={props.task.isDone? 'is-done': ''}>
            <Checkbox color={"primary"} checked={props.task.isDone}
                      onChange={changeTaskStatus}/>
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </li>
    )
})
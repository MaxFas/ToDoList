import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, newTitle: string) => void
}

export const Task:React.FC<TaskPropsType> = React.memo((props) => {

    const {task,
        removeTask,
        changeTaskStatus,
        changeTaskTitle,} = props

    const removeTaskCallBack = useCallback(() => removeTask(task.id), [task.id, removeTask])
    const changeTaskStatusCallBack = useCallback((e:ChangeEvent<HTMLInputElement>)=>
        props.changeTaskStatus(task.id, e.currentTarget.checked), [task.id, changeTaskStatus])
    const changeTaskTitleCallBack = useCallback((newTitle: string)=>
        props.changeTaskTitle(task.id, newTitle), [task.id, changeTaskTitle])

    return (
        <li key={props.task.id} className={props.task.isDone? 'is-done': ''}>
            <Checkbox color={"primary"} checked={props.task.isDone}
                      onChange={changeTaskStatusCallBack}/>
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitleCallBack}/>
            <IconButton onClick={removeTaskCallBack}>
                <Delete/>
            </IconButton>
        </li>
    )
})
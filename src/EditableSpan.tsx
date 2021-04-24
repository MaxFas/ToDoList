import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanType = {
    title: string
    changeTitle: (newTask: string) => void
}

const EditableSpan = React.memo((props: EditableSpanType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)}
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter'){
            setEditMode(false)
            props.changeTitle(title)
        }
    }


    return (
        editMode? <TextField variant={"outlined"} value={title} onKeyPress={onEnter} onChange={onChangeHandler} onBlur={offEditMode} autoFocus={true}/>:
        <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})

export default EditableSpan
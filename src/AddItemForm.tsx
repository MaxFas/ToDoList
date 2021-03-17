import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {Button, TextField} from "@material-ui/core";

type AddItemFormType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false)
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    return (
        <div>
            <TextField value={title} variant={"outlined"}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressAddItem}
                       label={'Task name'}
                       error={error}
                       helperText={error && 'Title is required'}/>
            <Button variant={"contained"} onClick={addItem} color={"primary"}>+</Button>

        </div>
    )
}

export default AddItemForm
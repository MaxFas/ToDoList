import React, {useState, KeyboardEvent, ChangeEvent} from "react";

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
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressAddItem}
                   className={error ? 'error': ''}/>
            <button onClick={addItem}>+</button>
            {error && <div className={'error-message'}>Title is required!</div>}
        </div>
    )
}

export default AddItemForm
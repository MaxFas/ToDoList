import {TasksStateType, ToDoListType} from "../App";
import {tasksReducer} from "../reducers/tasks-reducer";
import {addToDoListAC, toDoListReducer} from "../reducers/todoList-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<ToDoListType> = [];

    const action = addToDoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = toDoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.toDoListID);
    expect(idFromTodolists).toBe(action.toDoListID);
});


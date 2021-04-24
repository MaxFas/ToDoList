import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {Task, TaskPropsType} from "../Task";
import {action} from "@storybook/addon-actions";

export default {
    title: 'TODOLISTS/Task',
    component: Task,
} as Meta;

let removeTask = action('Remove task');
let changeTaskStatus = action('Change status');
let changeTaskTitle = action('Change title');

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

let baseArgs = {
    removeTask,
    changeTaskStatus,
    changeTaskTitle
}

export const TaskIsDoneStories = Template.bind({});
TaskIsDoneStories.args = {
    ...baseArgs,
    task: {id: '1', title: 'REACT', isDone: true}
}
export const TaskIsNotDoneStories = Template.bind({});
TaskIsNotDoneStories.args = {
    ...baseArgs,
    task: {id: '1', title: 'REACT', isDone: false}
}



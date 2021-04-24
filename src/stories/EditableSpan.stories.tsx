import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import EditableSpan, {EditableSpanType} from "../EditableSpan";

export default {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    argTypes: {
        title: {
            defaultValue: 'React'
        }
    }
} as Meta;

const Template: Story<EditableSpanType> = (args) => <EditableSpan {...args} />;

export const EditableSpanStories = Template.bind({});
EditableSpanStories.args = {
    changeTitle: action('Value changed'),
}

export const TaskIsDoneStories = Template.bind({});
TaskIsDoneStories.args = {
    changeTitle: action('Value changed'),
}


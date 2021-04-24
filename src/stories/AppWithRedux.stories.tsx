import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";

export default {
    title: 'TODOLISTS/AppWithRedux',
    component: AppWithRedux,
    argTypes: {}
} as Meta;

const Template: Story = (args) => <Provider store={store}> <AppWithRedux {...args} /> </Provider>;

export const AppWithReduxStories = Template.bind({});
AppWithReduxStories.args = {}


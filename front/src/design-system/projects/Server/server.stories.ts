import type { Meta, StoryObj } from '@storybook/react';
import {ServerProject} from './server.tsx';


const meta = {
    title: 'Projects/Server',
    component: ServerProject
} satisfies Meta<typeof ServerProject>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Base: Story = {
    parameters: {
        backgrounds: {
            default: 'wallpaper',
        },
    },
    args: {

    },
};

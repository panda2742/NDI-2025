import type { Meta, StoryObj } from '@storybook/react';
import {SnakeProject} from './snake.tsx';


const meta = {
    title: 'Projects/Snake',
    component: SnakeProject
} satisfies Meta<typeof SnakeProject>;

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

import type { Meta, StoryObj } from '@storybook/react';
import { OkNestorProject } from './ok_nestor.tsx';


const meta = {
    title: 'Projects/OkNestor',
    component: OkNestorProject
} satisfies Meta<typeof OkNestorProject>;

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

import type { Meta, StoryObj } from '@storybook/react';
import {RootmeProject} from './rootme.tsx';


const meta = {
    title: 'Projects/RootMe',
    component: RootmeProject
} satisfies Meta<typeof RootmeProject>;

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

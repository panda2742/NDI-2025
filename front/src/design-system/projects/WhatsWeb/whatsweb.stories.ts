import type { Meta, StoryObj } from '@storybook/react';
import { WhatsWebProject } from './whatsweb.tsx';


const meta = {
    title: 'Projects/WhatsWeb',
    component: WhatsWebProject
} satisfies Meta<typeof WhatsWebProject>;

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

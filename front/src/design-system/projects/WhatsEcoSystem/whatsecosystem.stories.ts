import type { Meta, StoryObj } from '@storybook/react';
import {WhatsEcoSystemProject} from './whatsecosystem.tsx';


const meta = {
    title: 'Projects/WhatsEcoSystem',
    component: WhatsEcoSystemProject
} satisfies Meta<typeof WhatsEcoSystemProject>;

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

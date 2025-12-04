import type { Meta, StoryObj } from '@storybook/react';
import { AppIcon } from './app_icon.tsx';


const meta = {
    title: 'Atom/AppIcon',
    component: AppIcon
} satisfies Meta<typeof AppIcon>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Base: Story = {
    parameters: {
        backgrounds: {
            default: 'wallpaper',
        },
    },
    args: {
        label: "WhatsWeb",
        state: 0,
        iconKey: 'whatsweb',
        index: 1
    },
};

export const Contact: Story = {
    args: {
        label: "Contact",
        state: 1,
        iconKey: 'contact',
        index: 2
    },
};

export const Spotify: Story = {
    args: {
        label: "Spotify",
        state: 0,
        iconKey: "whatsweb",
        index: 3
    }
};

import type { Meta, StoryObj } from '@storybook/react';
import { Controls } from './controls.tsx';


const meta = {
    title: 'Atom/Controls',
    component: Controls
} satisfies Meta<typeof Controls>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Base: Story = {
    parameters: {
        backgrounds: {
            default: 'wallpaper',
        },
    },
    args: {
        onClose: () => {},
        onMinimise: () => {},
        onFullScreen: () => {}
    },
};

export const WithOutMinimise: Story = {
    parameters: {
        backgrounds: {
            default: 'wallpaper',
        },
    },
    args: {
        onClose: () => {},
        onFullScreen: () => {}
    },
};

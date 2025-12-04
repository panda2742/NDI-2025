import type { Meta, StoryObj } from '@storybook/react';
import { MenuIcon } from './menu_icon.tsx';


const meta = {
    title: 'Atom/MenuIcon',
    component: MenuIcon
} satisfies Meta<typeof MenuIcon>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Base: Story = {
    parameters: {
        backgrounds: {
            default: 'wallpaper',
        },
    },
    args: {
        type: 'date'
    }
};

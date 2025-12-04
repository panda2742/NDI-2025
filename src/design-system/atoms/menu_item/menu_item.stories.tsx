import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem } from './menu_item.tsx';


const meta = {
    title: 'Atom/MenuItem',
    component: MenuItem
} satisfies Meta<typeof MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Base: Story = {
    parameters: {
        backgrounds: {
            default: 'wallpaper',
        },
    },
    args: {
        label: "",
        primary: true
    },
};

export const WhatsWeb: Story = {
    ...Base,
    args: {
        label: "WhatsWeb",
        primary: true
    },
};

export const Fichier: Story = {
    ...Base,
    args: {
        label: "Fichier",
        primary: false
    }
};

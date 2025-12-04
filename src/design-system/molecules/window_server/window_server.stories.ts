import type { Meta, StoryObj } from '@storybook/react';
import { WindowServer } from './window_server.tsx';


const meta = {
    title: 'Molecules/Window Server',
    component: WindowServer
} satisfies Meta<typeof WindowServer>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Base: Story = {
    parameters: {
        backgrounds: {
            default: 'wallpaper2',
        },
        layout: 'fullscreen',
    },
    args: {
        focusAppName: 'WhatsWeb',
        menuItems: [
            { label: 'Fichier' },
            { label: 'Éditer' },
            { label: 'Présentation' },
            { label: 'Aller' },
            { label: 'Fenêtre' },
            { label: 'Aide' },
        ]
    },
};

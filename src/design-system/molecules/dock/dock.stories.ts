import type {Meta, StoryObj} from '@storybook/react';
import {Dock} from './dock.tsx';

const meta = {
    component: Dock,
    title: "Molecules/Dock",

} satisfies Meta<typeof Dock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
    // 👇 Story-level parameters
    parameters: {
        backgrounds: {
            default: 'wallpaper',
        },
    },
    args: {
        apps: [
            [
                {
                    label: 'WhatsWeb',
                    id: 'whatsweb',
                    content: null,
                    iconKey: 'whatsweb',
                    state: 2,
                    type: 'project'
                },
                {
                    label: 'Server',
                    id: 'server',
                    content: null,
                    iconKey: 'server',
                    state: 0,
                    type: 'project'
                },
                {
                    label: 'RootMe',
                    id: 'rootme',
                    content: null,
                    iconKey: 'rootme',
                    state: 0,
                    type: 'project'
                },
                {
                    label: 'OkNestor',
                    id: 'oknestor',
                    content: null,
                    iconKey: 'oknestor',
                    state: 0,
                    type: 'project'
                }
            ],
            [
                {
                    label: 'Contact',
                    id: 'contact',
                    content: null,
                    iconKey: 'contact',
                    state: 0,
                    type: 'contact'
                },
                {
                    label: 'CV.pdf',
                    id: 'cv',
                    content: null,
                    iconKey: 'document',
                    state: 0,
                    type: 'contact',
                    onClick: () => { if (window) window.open('https://cdn.whatsweb.fr/CV.pdf', '_blank')!.focus(); }
                }
            ]
        ],
        updateAppState: () => {},
    }
};

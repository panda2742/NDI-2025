import type { Meta, StoryObj } from '@storybook/react';
import { App } from './app.tsx';
import { ProjectExample } from '@atoms/project_example/project_example';


const meta = {
    title: 'Molecules/App',
    component: App,
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
    parameters: {
        backgrounds: {
            default: 'wallpaper',
        },
    },
    args: {
        label: 'WhatsWeb',
        uniqueKey: 'idk',
        children: <ProjectExample />,
        state: 1,
        type: 'project'
    },
};

import type { Meta, StoryObj } from '@storybook/react';
import { ProjectExample } from './project_example.tsx';

const meta = {
    title: 'Atom/Project Example',
    component: ProjectExample,
} satisfies Meta<typeof ProjectExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
    parameters: {
        backgrounds: {
            default: 'wallpaper',
        },
    },
    args: {},
};

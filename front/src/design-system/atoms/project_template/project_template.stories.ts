import type { Meta, StoryObj } from '@storybook/react';
import { ProjectTemplate } from './project_template.tsx';


const meta = {
    title: 'Atom/Project Template',
    component: ProjectTemplate
} satisfies Meta<typeof ProjectTemplate>;

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

import type { Meta, StoryObj } from '@storybook/react';
import { NirdProject } from './nird';

const meta = {
  title: 'Projects/Nird',
  component: NirdProject
} satisfies Meta<typeof NirdProject>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  parameters: {},
  args: {}
}

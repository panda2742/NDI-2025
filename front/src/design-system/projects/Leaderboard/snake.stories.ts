import type { Meta, StoryObj } from '@storybook/react';
import {LeaderboardProject} from './leaderboard.tsx';


const meta = {
	title: 'Projects/Snake',
	component: LeaderboardProject
} satisfies Meta<typeof LeaderboardProject>;

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
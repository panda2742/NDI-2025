import type { Preview } from "@storybook/react";
import '../src/css/reset.css'
import '../src/css/global.scss'


const preview: Preview = {
    parameters: {
        layout: 'centered',
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            values: [
                { name: 'wallpaper', value: '#ffffff url(https://i.pinimg.com/originals/80/05/82/80058231099b67cab36923f567d1db1a.jpg) center center/cover no-repeat local;' },
                { name: 'wallpaper2', value: '#ffffff url(https://i.pinimg.com/originals/80/05/82/80058231099b67cab36923f567d1db1a.jpg) center 0/cover no-repeat local;' },
                { name: 'light', value: '#ffffff' },
                { name: 'dark', value: '#333' },
            ],
        },
    },
};

export default preview;

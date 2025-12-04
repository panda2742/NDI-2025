import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useMediaQuery } from 'react-responsive';

import '@css/reset.css'
import '@css/global.scss'
// import '@css/cursors.scss'

import MacOS from './App.tsx'
import MobileView from './website_in_building.tsx';

// eslint-disable-next-line react-refresh/only-export-components
const AppSelector = () => {
    const isSmallScreen = useMediaQuery({ maxWidth: 840 }); // Ajustez la largeur selon vos besoins.

    return isSmallScreen ? <MobileView /> : <MacOS />;
};


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppSelector />
    </StrictMode>
);


import {useState, useRef, useEffect, MutableRefObject, MouseEvent} from 'react';

import { WindowServer } from '@molecules/window_server/window_server.tsx';
import { defaultApps, IApp } from '#/default_apps.tsx';
import { Dock } from '@molecules/dock/dock.tsx';
import { App } from '@molecules/app/app.tsx'

import Draggable from 'gsap/Draggable'
import gsap from 'gsap';

import '@css/App.scss'




gsap.registerPlugin(Draggable);

const createDraggableApp = (uniqueKey: string) => {
    Draggable.create(`.app-id-${uniqueKey}`, {
        bounds: '.apps-container',
        trigger: `.app-id-${uniqueKey} > .app-header`,
        allowEventDefault: true,
        zIndexBoost: false
    })
}

function MacOS() {

    const [appWindow, setAppWindow] = useState({
        focusAppName: 'Finder',
        menuItems: [
            { label: 'Fichier' },
            { label: 'Éditer' },
            { label: 'Présentation' },
            { label: 'Aller' },
            { label: 'Fenêtre' },
            { label: 'Aide' },
        ]
    })


    const [apps, setApps] = useState(defaultApps)

    const updateAppState = (id: string, newState: 0 | 1 | 2) => {
        setApps((prevApps) =>
            prevApps.map((group) =>
                group.map((app) =>
                    app.id === id ? { ...app, state: newState } : app
                )
            )
        );
    };


    const zIndexBoost = useRef(100);

    const appsContainer = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!appsContainer.current) return;

        apps.forEach(appGroup => appGroup.forEach((app) => {
            createDraggableApp(app.id)
        }))

    }, [appsContainer])

    const handleZIndexBoost = (e: MutableRefObject<HTMLDivElement | null>, currentApp: IApp) => {
        if (!e.current) return
        console.log(`➡️ Focus : ${currentApp.id}`)

        e.current.style.zIndex = zIndexBoost.current.toString();
        zIndexBoost.current++;

        setAppWindow((prevState) =>
            ({...prevState, focusAppName: currentApp.label}))
    }


    let mousePressed = false;
    let firstPosX = 0;
    let firstPosY = 0;
    const selectZoneRef = useRef<HTMLDivElement | null>(null);


    const handleMouseMove = (e: MouseEvent) => {
        if (!mousePressed || !selectZoneRef.current) return
        // e.preventDefault();

        // console.log(e.target)

        const edgeX = e.pageX - firstPosX;
        const edgeY = e.pageY - firstPosY;

        if (edgeX > 0) {
            selectZoneRef.current.style.left = `${firstPosX}px`;
            selectZoneRef.current.style.width = `${edgeX}px`;
        } else {
            selectZoneRef.current.style.left = `${e.pageX}px`;
            selectZoneRef.current.style.width = `${edgeX * -1}px`;
        }

        if (edgeY > 0) {
            selectZoneRef.current.style.top = `${firstPosY}px`;
            selectZoneRef.current.style.height = `${edgeY}px`;
        } else {
            selectZoneRef.current.style.top = `${e.pageY}px`;
            selectZoneRef.current.style.height = `${edgeY * -1}px`;
        }


    }

    const handleMouseDown = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (!target?.classList.contains('apps-container')) return;

        e.preventDefault();

        firstPosX = e.pageX;
        firstPosY = e.pageY;
        mousePressed = true

        if (!selectZoneRef.current) return
        selectZoneRef.current.style.display = 'flex'

    }

    const handleMouseUP = () => {
        mousePressed = false
        if (!selectZoneRef.current) return

        selectZoneRef.current.style.display = 'none'
        selectZoneRef.current.style.left = '0';
        selectZoneRef.current.style.width = '0';
        selectZoneRef.current.style.top = '0';
        selectZoneRef.current.style.height = '0';
    }


    return <div id="app" onMouseMove={handleMouseMove} onMouseUp={handleMouseUP} onMouseDown={handleMouseDown}>
        <WindowServer {...appWindow} />
        <div className="apps-container" ref={appsContainer}>

            {apps.map((appGroup, groupIndex) => (
                appGroup.map((app, appIndex) => {
                    if (!app.content) return
                    return <App label={app.label} state={app.state} uniqueKey={app.id} type={app.type} key={groupIndex+appIndex} onMouseDown={(e) => {handleZIndexBoost(e, app)}} updateState={(newState) => updateAppState(app.id, newState)}>
                        {app.content}
                    </App>
                })
            ))}
        </div>

        <div id="select-zone" ref={selectZoneRef}></div>

        <Dock apps={apps} updateAppState={updateAppState}/>
    </div>;
}

export default MacOS

import { ReactElement } from 'react'

// import { ProjectTemplate } from '@atoms/project_template/project_template.tsx';
// import { Terminal } from '@molecules/terminal/terminal.tsx';
import { Contact } from '@molecules/contact/contact.tsx';
import { OkNestorProject, RootmeProject, ServerProject, WhatsWebProject } from '@projects/index.ts';
import {Terminal} from "@molecules/terminal/terminal.tsx";


export interface IApp {
    label: string,
    id: string,
    content: ReactElement | null,
    iconKey: 'whatsweb' | 'whatsecosystem' | 'server' | 'rootme' | 'oknestor' | 'terminal' | 'contact' | 'document' | 'pages',
    state: 0 | 1 | 2,
    type: 'application' | 'project' | 'contact',
    onClick?: () => void;
}

export const defaultApps: IApp[][] = [
    [
        {
            label: 'WhatsWeb',
            id: 'whatsweb',
            content: <WhatsWebProject key={'whatsweb'} />,
            iconKey: 'whatsweb',
            state: 2,
            type: 'project'
        },
        {
            label: 'Server',
            id: 'server',
            content: <ServerProject key={'server'} />,
            iconKey: 'server',
            state: 0,
            type: 'project'
        },
        {
            label: 'RootMe',
            id: 'rootme',
            content: <RootmeProject key={'rootme'} />,
            iconKey: 'rootme',
            state: 0,
            type: 'project'
        },
        {
            label: 'OkNestor',
            id: 'oknestor',
            content: <OkNestorProject key={'oknestor'} />,
            iconKey: 'oknestor',
            state: 0,
            type: 'project'
        }
    ],
    [
        {
            label: 'Terminal',
            id: 'terminal',
            content: <Terminal key={'contact'} />,
            iconKey: 'terminal',
            state: 0,
            type: 'application'
        }
    ],
    [
        {
            label: 'Contact',
            id: 'contact',
            content: <Contact key={'contact'} />,
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
]

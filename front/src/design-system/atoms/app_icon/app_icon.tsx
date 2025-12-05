import './style.scss'

import Terminal from './icons/Terminal.png';
import Clipouille from './icons/Clipouille.png';

const icons = {
    terminal: Terminal,
    clipouille: Clipouille,
};

export interface IconProps {
    label: string;
    state: 0 | 1 | 2;
    iconKey: 'terminal' | 'clipouille';
    index: number;
    onClick?: () => void;
}

export const AppIcon = ({label, state, iconKey, index,  onClick = () => {}}: IconProps) => {
    const maskId = `blured-arrow-tool-tip-${index}`;
    return <>
        <div className="appIcon unselectable" onClick={onClick}>
            <div className="tool-tip-name">
                <div className="text unselectable" id={maskId + '-text'}>
                    {label}
                </div>
                {/*<svg width="27" height="8" viewBox="0 0 27 8" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                {/*    <path fillRule="evenodd" clipRule="evenodd"*/}
                {/*          d="M0 0L2.63415 0C2.63415 0 2.63415 0 2.63415 0C2.63415 0 5.26829 0 7.2439 2.02105C9.21951 4.0421 9.87805 5.05263 11.1951 6.73684C12.5122 8.42105 13.1707 8.42105 14.4878 6.73684C15.8049 5.05263 17.122 3.36842 18.439 2.02105C19.7561 0.673687 20.4146 0 23.7073 0C27 0 27 0 27 0C27 0 27 0 27 0L0 0Z"*/}
                {/*          fill="white"*/}
                {/*    />*/}
                {/*</svg>*/}


                <div className="blurred-shape" style={{mask: `url(#${maskId})`, WebkitMask: `url(#${maskId})`}}>
                    <svg width="27" height="8" viewBox="0 0 27 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id={maskId}>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M0 0L2.63415 0C2.63415 0 2.63415 0 2.63415 0C2.63415 0 5.26829 0 7.2439 2.02105C9.21951 4.0421 9.87805 5.05263 11.1951 6.73684C12.5122 8.42105 13.1707 8.42105 14.4878 6.73684C15.8049 5.05263 17.122 3.36842 18.439 2.02105C19.7561 0.673687 20.4146 0 23.7073 0C27 0 27 0 27 0C27 0 27 0 27 0L0 0Z"
                                  fill="white"
                            />
                        </mask>
                    </svg>
                </div>
            </div>

            <img src={icons[iconKey]} alt={iconKey}/>

            <div className={`open ${state ? 'active' : ''}`}></div>
        </div>
    </>
};

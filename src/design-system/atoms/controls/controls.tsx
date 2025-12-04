import './style.scss'

interface IControlsProps {
    onClose?: () => void | undefined,
    onMinimise?: () => void | undefined,
    onFullScreen?: () => void | undefined,
}

export const Controls = ({onClose = undefined, onMinimise = undefined, onFullScreen = undefined}: IControlsProps) => {
    return <div className="controls">
        <div className={`controls-btn ${onClose ? 'active' : ''}`} onClick={onClose}></div>
        <div className={`controls-btn ${onMinimise ? 'active' : ''}`} onClick={onMinimise}></div>
        <div className={`controls-btn ${onFullScreen ? 'active' : ''}`} onClick={onFullScreen}></div>
    </div>
}

import './style.scss'

export interface MenuProps {
    label: string;
    primary?: boolean;
    onClick?: () => void;
}

export const MenuItem = ({label, primary = false, onClick = () => {}}: MenuProps) => {
    return <div className={`window_menu_item unselectable ${primary ? 'primary' : ''}`} onClick={onClick}>{label}</div>
};

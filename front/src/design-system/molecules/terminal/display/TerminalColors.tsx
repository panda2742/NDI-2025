import { CSSProperties, PropsWithChildren } from "react";

export interface ColorInterface {
	c?: 'black' | 'white' | 'red' | 'blue' | 'green' | 'yellow' | 'cyan' | 'purple';
	b?: boolean;
}

export default function C({ c = 'white', b = false, children, ...props }: PropsWithChildren<ColorInterface & {style?: CSSProperties}>) {
	return <span className={`${c} ${b ? 'bold' : ''}`} {...props}>{children}</span>;
};
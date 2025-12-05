import { PropsWithChildren } from "react";

export default function Line({ children }: PropsWithChildren) {
	return <div className='line'>{children}</div>
};

import { ReactNode } from 'react';

export interface DefaultComponentProps {
	className?: string;
}

export interface WrapperProps extends DefaultComponentProps {
	children: ReactNode;
}

export interface Toast {
	id: string;
	title: string;
	contents: string;
	duration: number;
}

export interface ToastContextType {
	toasts: Toast[];
	addToasts: (options: {
		title: string;
		content: string;
		duration: number;
	}) => void;
	delToasts: (id: string) => void;
}

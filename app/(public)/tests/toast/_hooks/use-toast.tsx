"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import type { Toast, ToastContextType } from "../types/toast.type";

interface Props {
	children: ReactNode;
}

const initialValue: ToastContextType = {
	toasts: [],
	addToasts: () => {},
	delToasts: () => {},
};

const ToastContext = createContext(initialValue);

export const ToastProvider = ({ children }: Props) => {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const value = {
		toasts,
		addToasts: (options: {
			title: string;
			content: string;
			duration: number;
		}) => {
			const newToast = {
				id: uuid(),
				title: options.title,
				contents: options.content,
				duration: options.duration,
			};
			setToasts((prev) => [...prev, newToast]);
		},
		delToasts: (id: string) => {
			const filtered = toasts.filter((toast) => toast.id !== id);
			setToasts(filtered);
		},
	};

	return (
		<ToastContext.Provider value={value}>{children}</ToastContext.Provider>
	);
};

const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("오류 발생! Provider 안에서 사용해 주세요");
	}
	return context;
};

export default useToast;

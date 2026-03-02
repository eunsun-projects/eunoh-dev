"use client";

import useToast, { ToastProvider } from "../_hooks/use-toast";
import ToastController from "./toast-controller";
import ToastUl from "./toast-ul";

function Toast() {
	const { toasts } = useToast();

	return (
		<>
			<ToastController />
			{toasts.length > 0 && <ToastUl />}
		</>
	);
}

function ToastTemplate() {
	return (
		<ToastProvider>
			<Toast />
		</ToastProvider>
	);
}

export default ToastTemplate;

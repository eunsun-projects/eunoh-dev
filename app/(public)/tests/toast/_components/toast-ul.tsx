"use client";

import useToast from "../_hooks/use-toast";
import ToastLi from "./toast-li";

function ToastUl() {
	const { toasts } = useToast();

	return (
		<ul className="fixed right-6 bottom-6 z-1005 grid grid-cols-1 gap-y-3 text-black">
			{toasts.map((toast) => (
				<ToastLi key={toast.id} toast={toast} />
			))}
		</ul>
	);
}

export default ToastUl;

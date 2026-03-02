"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import useToast from "../_hooks/use-toast";
import type { Toast } from "../types/toast.type";

interface ToastLiProps {
	toast: Toast;
}

function ToastLi({ toast }: ToastLiProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(true);

	const { delToasts } = useToast();

	useEffect(() => {
		let timeoutId01: NodeJS.Timeout;
		let timeoutId02: NodeJS.Timeout;

		setIsOpen(true);

		const promise = new Promise((resolve) => {
			timeoutId01 = setTimeout(() => {
				setIsOpen(false);
				resolve("");
			}, toast.duration);
		});
		promise.then(() => {
			timeoutId02 = setTimeout(() => {
				setIsVisible(false);
			}, 500);
		});

		return () => {
			clearTimeout(timeoutId01);
			clearTimeout(timeoutId02);
		};
	}, [toast.duration]);

	useEffect(() => {
		if (!isVisible) delToasts(toast.id);
	}, [isVisible, delToasts, toast.id]);

	return (
		<>
			{isVisible && (
				<li className="relative z-1005">
					<div
						className={clsx(
							"flex w-[320px] transform items-center rounded-lg border bg-white p-6 text-sm shadow-lg transition duration-500",
							{
								"translate-x-[calc(100%+24px)]": !isOpen,
								"!translate-x-0": isOpen,
							},
						)}
					>
						<div className="flex grow flex-col">
							<h6 className="font-semibold">{toast.title}</h6>
							<p>{toast.contents}</p>
						</div>
					</div>
				</li>
			)}
		</>
	);
}

export default ToastLi;

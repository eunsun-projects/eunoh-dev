"use client";

import type { PropsWithChildren } from "react";

type ModalProps = {
	closeModal: (e: React.MouseEvent) => void;
} & PropsWithChildren;

function Modal({ closeModal, children }: ModalProps) {
	return (
		<div
			tabIndex={0}
			role="button"
			aria-label="Close modal"
			aria-pressed="false"
			aria-expanded="false"
			aria-haspopup="dialog"
			aria-describedby="modal-description"
			aria-labelledby="modal-title"
			aria-controls="modal-content"
			onKeyDown={(e) => {
				if (e.key === "Enter") closeModal(e as unknown as React.MouseEvent);
			}}
			className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-neutral-700/50 backdrop-blur-sm"
			onClick={closeModal}
		>
			<dialog
				open
				className="top-1/2 left-1/2 z-50 h-fit w-fit -translate-x-1/2 -translate-y-1/2"
			>
				{children}
			</dialog>
		</div>
	);
}

export default Modal;

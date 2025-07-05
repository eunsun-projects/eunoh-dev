"use client";

import type { PropsWithChildren } from "react";

type ModalProps = {
  closeModal: (e: React.MouseEvent) => void;
} & PropsWithChildren;

function Modal({ closeModal, children }: ModalProps) {
  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "Enter") closeModal(e as unknown as React.MouseEvent);
      }}
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-sm bg-neutral-700/50 z-50"
      onClick={closeModal}
    >
      <dialog
        open
        className="z-50 h-fit w-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {children}
      </dialog>
    </div>
  );
}

export default Modal;

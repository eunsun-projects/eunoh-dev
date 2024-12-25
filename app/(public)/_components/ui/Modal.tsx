'use client';

import { PropsWithChildren } from 'react';

type ModalProps = {
  closeModal: (e: React.MouseEvent) => void;
} & PropsWithChildren;

function Modal({ closeModal, children }: ModalProps) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-sm bg-neutral-700/50 z-50"
      onClick={closeModal}
    >
      <dialog open className="z-50 h-fit w-fit">
        {children}
      </dialog>
    </div>
  );
}

export default Modal;

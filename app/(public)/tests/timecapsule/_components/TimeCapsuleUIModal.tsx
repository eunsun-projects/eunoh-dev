'use client';

import type { Dispatch, SetStateAction } from 'react';
import { IoClose } from 'react-icons/io5';
import { useTimeCapsuleStore } from '../_libs/zustand';
import type { TimeCapsuleUIState } from './TimeCapsuleUI';

interface TimeCapsuleUIModalProps {
  setIsOpen: Dispatch<SetStateAction<TimeCapsuleUIState>>;
}

function TimeCapsuleUIModal({ setIsOpen }: TimeCapsuleUIModalProps) {
  const { setFocusedObject, focusedObject } = useTimeCapsuleStore();

  const handleClose = () => {
    setIsOpen((prev) => ({
      ...prev,
      isModalOpen: false,
    }));
    setFocusedObject({ isIdle: true, timeCapsule: null });
  };

  return (
    <div className="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 min-w-[300px] bg-neutral-800/50 text-neutral-200 border border-neutral-700 pointer-events-auto p-2 rounded-md hover:bg-neutral-800/70 active:bg-neutral-800/90">
      <div className="flex justify-end">
        <IoClose className="cursor-pointer" onClick={handleClose} />
      </div>
      <p>{focusedObject?.timeCapsule?.title}</p>
      <p>{focusedObject?.timeCapsule?.description}</p>
    </div>
  );
}

export default TimeCapsuleUIModal;

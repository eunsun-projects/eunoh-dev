"use client";

import { useAuth } from "@/hooks/auth/useAuth";
import type { TimeCapsule } from "@/types/tests.type";
import { format } from "date-fns";
import type { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { useDeleteTimeCapsulesMutation } from "../_hooks/timecapsule.hooks";
import { useTimeCapsuleStore } from "../_libs/zustand";
import type { TimeCapsuleUIState } from "./TimeCapsuleUI";

interface TimeCapsuleUIListProps {
  setIsOpen: Dispatch<SetStateAction<TimeCapsuleUIState>>;
}

function TimeCapsuleUIList({ setIsOpen }: TimeCapsuleUIListProps) {
  const { setValue } = useFormContext();
  const { timeCapsules, setFocusedObject } = useTimeCapsuleStore();
  const { user } = useAuth();
  const { mutateAsync: mutateDeleteTimeCapsule } =
    useDeleteTimeCapsulesMutation();

  const handleClickList = (timeCapsule: TimeCapsule) => () => {
    setFocusedObject({ isIdle: false, timeCapsule });
    setIsOpen((prev: TimeCapsuleUIState) => ({
      ...prev,
      isPasswordOpen: true,
      isModalOpen: false,
      isFormOpen: false,
      isListOpen: false,
    }));
  };

  const handleClickEdit = (timeCapsule: TimeCapsule) => () => {
    setIsOpen((prev: TimeCapsuleUIState) => ({
      ...prev,
      isPasswordOpen: false,
      isModalOpen: false,
      isListOpen: false,
      isFormOpen: true,
      isEditNow: true,
    }));
    setFocusedObject({ isIdle: false, timeCapsule });
    setValue("title", timeCapsule.title);
    setValue("description", timeCapsule.description);
    setValue("password", timeCapsule.password);
  };

  const handleClickDelete = (timeCapsule: TimeCapsule) => () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const payload = {
        id: timeCapsule.id,
      };
      mutateDeleteTimeCapsule(payload);
    }
  };

  const handleClose = () => {
    setIsOpen((prev: TimeCapsuleUIState) => ({
      ...prev,
      isListOpen: false,
      isFormOpen: false,
      isPasswordOpen: false,
      isModalOpen: false,
      isLogInOpen: false,
    }));
    setFocusedObject({ isIdle: null, timeCapsule: null });
  };

  return (
    <div className="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-neutral-800/50 text-neutral-200 border border-neutral-700 pointer-events-auto p-1 rounded-md hover:bg-neutral-800/70 active:bg-neutral-800/90">
      <div className="flex justify-end">
        <IoClose className="cursor-pointer" onClick={handleClose} />
      </div>
      {timeCapsules
        .filter((timeCapsule) => timeCapsule.user_email === user?.email)
        .map((timeCapsule) => (
          <div key={timeCapsule.created_at} className="text-xs">
            <ul className="min-w-[372px]">
              <li className="flex gap-2 items-center justify-between">
                <span>{"✔ "}</span>
                <span
                  onKeyUp={handleClickList(timeCapsule)}
                  className="w-24 md:w-28 truncate cursor-pointer"
                  onClick={handleClickList(timeCapsule)}
                >
                  {timeCapsule.title}
                </span>
                <span>{" - "}</span>
                <span className="w-36 md:w-44 text-xs">
                  {format(
                    new Date(timeCapsule.created_at),
                    "yy-MM-dd HH:mm:ss"
                  )}
                </span>
                <span
                  onKeyUp={handleClickEdit(timeCapsule)}
                  className="cursor-pointer"
                  onClick={handleClickEdit(timeCapsule)}
                >
                  수정
                </span>
                <span
                  onKeyUp={handleClickDelete(timeCapsule)}
                  className="cursor-pointer"
                  onClick={handleClickDelete(timeCapsule)}
                >
                  삭제
                </span>
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
}

export default TimeCapsuleUIList;

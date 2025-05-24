"use client";

import { useAuth } from "@/hooks/auth/useAuth";
import type { TimeCapsule } from "@/types/tests.type";
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useShallow } from "zustand/react/shallow";
import {
  useEditTimeCapsulesMutation,
  useTimeCapsulesMutation,
} from "../_hooks/timecapsule.hooks";
import { generateColor } from "../_libs/generateColor";
import { generateRandomPosition } from "../_libs/generatePosition";
import { useTimeCapsuleStore } from "../_libs/zustand";
import type { TimeCapsuleUIState } from "./TimeCapsuleUI";

interface TimeCapsuleUIFormProps {
  isOpen: TimeCapsuleUIState;
  setIsOpen: Dispatch<SetStateAction<TimeCapsuleUIState>>;
}

function TimeCapsuleUIForm({ isOpen, setIsOpen }: TimeCapsuleUIFormProps) {
  const { setFocusedObject, addTimeCapsule, timeCapsules, focusedObject } =
    useTimeCapsuleStore(
      useShallow((state) => ({
        setFocusedObject: state.setFocusedObject,
        addTimeCapsule: state.addTimeCapsule,
        timeCapsules: state.timeCapsules,
        focusedObject: state.focusedObject,
      }))
    );
  const { register, handleSubmit, reset } = useFormContext<TimeCapsule>();
  const { user } = useAuth();
  const { mutateAsync: mutateAddTimeCapsule } = useTimeCapsulesMutation();
  const { mutateAsync: mutateEditTimeCapsule } = useEditTimeCapsulesMutation();
  const [showPassword, setShowPassword] = useState(false);
  const addedTimeCapsule = useRef<TimeCapsule | null>(null);

  const togglePasswordVisibility = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const handleClose = () => {
    setIsOpen((prev) => ({
      ...prev,
      isFormOpen: false,
      isPasswordOpen: false,
      isModalOpen: false,
      isListOpen: false,
      isLogInOpen: false,
    }));
    setFocusedObject({
      isIdle: isOpen.isEditNow ? true : null,
      timeCapsule: null,
    });
  };

  const onSubmit = async (data: TimeCapsule) => {
    if (!user) return;
    const timeCapsulePayload: Partial<TimeCapsule> = {
      user_email: user.email,
      title: data.title,
      description: data.description,
      password: data.password,
      position: [
        generateRandomPosition(),
        generateRandomPosition(),
        generateRandomPosition(),
      ],
      color: generateColor(),
    };
    let response: TimeCapsule;
    if (isOpen.isEditNow) {
      timeCapsulePayload.id = focusedObject?.timeCapsule?.id;
      response = await mutateEditTimeCapsule(timeCapsulePayload);
    } else {
      response = await mutateAddTimeCapsule(timeCapsulePayload);
    }
    addTimeCapsule(response);
    addedTimeCapsule.current = response;
  };

  useEffect(() => {
    if (!addedTimeCapsule.current) return;
    const timeCapsule = timeCapsules.find(
      (timeCapsule) => timeCapsule.object?.name === addedTimeCapsule.current?.id
    );
    if (timeCapsule?.object) {
      setFocusedObject({ isIdle: false, timeCapsule });
      setIsOpen((prev) => ({
        ...prev,
        isFormOpen: false,
        isEditNow: false,
        isPasswordOpen: true,
        isModalOpen: false,
        isListOpen: false,
      }));
      reset();
    }
  }, [timeCapsules, reset, setFocusedObject, setIsOpen]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 bg-neutral-800/50 text-neutral-200 border border-neutral-700 pointer-events-auto p-2 rounded-md hover:bg-neutral-800/70 active:bg-neutral-800/90"
    >
      <div className="flex justify-end">
        <IoClose className="cursor-pointer" onClick={handleClose} />
      </div>
      <input
        className="bg-neutral-700 text-neutral-200"
        type="text"
        placeholder="제목"
        {...register("title")}
      />
      <textarea
        className="bg-neutral-700 text-neutral-200"
        placeholder="내용"
        {...register("description")}
      />
      <div className="w-full flex items-center">
        <input
          className="w-full bg-neutral-700 text-neutral-200"
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호"
          {...register("password")}
        />
        <div
          className="absolute right-3 cursor-pointer"
          onClick={togglePasswordVisibility}
          onKeyUp={togglePasswordVisibility}
        >
          {showPassword ? (
            <FaEye className="text-xs" />
          ) : (
            <FaEyeSlash className="text-xs" />
          )}
        </div>
      </div>
      <button type="submit">{isOpen.isEditNow ? "수정" : "보관"}</button>
    </form>
  );
}

export default TimeCapsuleUIForm;

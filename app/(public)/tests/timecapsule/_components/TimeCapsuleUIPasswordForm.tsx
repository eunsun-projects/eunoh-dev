"use client";

import { type Dispatch, type SetStateAction, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import type { TimeCapsule } from "@/types/tests.type";
import { useTimeCapsuleStore } from "../_libs/zustand";
import type { TimeCapsuleUIState } from "./TimeCapsuleUI";

interface TimeCapsuleUIPasswordFormProps {
	setIsOpen: Dispatch<SetStateAction<TimeCapsuleUIState>>;
}

function TimeCapsuleUIPasswordForm({
	setIsOpen,
}: TimeCapsuleUIPasswordFormProps) {
	const { setFocusedObject, focusedObject } = useTimeCapsuleStore();
	const { register, handleSubmit, setError, reset } =
		useFormContext<TimeCapsule>();
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);

	const onPasswordSubmit = (data: TimeCapsule) => {
		if (data.password === focusedObject?.timeCapsule?.password) {
			setIsOpen((prev) => ({
				...prev,
				isPasswordOpen: false,
				isModalOpen: true,
			}));
			reset();
		} else {
			setError("password", { message: "비밀번호가 틀렸습니다." });
		}
	};

	const handleClose = () => {
		setIsOpen((prev) => ({
			...prev,
			isPasswordOpen: false,
		}));
		setFocusedObject({ isIdle: true, timeCapsule: null });
	};

	return (
		<form
			onSubmit={handleSubmit(onPasswordSubmit)}
			className="-translate-y-1/2 pointer-events-auto absolute top-1/2 right-1/2 flex translate-x-1/2 flex-col gap-2 rounded-md border border-neutral-700 bg-neutral-800/50 p-2 text-neutral-200 hover:bg-neutral-800/70 active:bg-neutral-800/90"
		>
			<div className="flex justify-end">
				<IoClose className="cursor-pointer" onClick={handleClose} />
			</div>
			<div className="flex w-full items-center">
				<input
					className="bg-neutral-700 text-neutral-200"
					type={showPassword ? "text" : "password"}
					placeholder="비밀번호"
					{...register("password")}
				/>
				<div
					tabIndex={0}
					role="button"
					aria-label="Toggle password visibility"
					aria-pressed="false"
					aria-expanded="false"
					aria-haspopup="dialog"
					aria-describedby="toggle-password-visibility-description"
					aria-labelledby="toggle-password-visibility-title"
					aria-controls="toggle-password-visibility-content"
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
			<button type="submit">확인</button>
		</form>
	);
}

export default TimeCapsuleUIPasswordForm;

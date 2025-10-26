"use client";

import type { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import type { TimeCapsule } from "@/types/tests.type";
import type { TimeCapsuleUIState } from "./TimeCapsuleUI";

interface TimeCapsuleUIErrorProps {
	setIsOpen: Dispatch<SetStateAction<TimeCapsuleUIState>>;
}

function TimeCapsuleUIError({ setIsOpen }: TimeCapsuleUIErrorProps) {
	const {
		clearErrors,
		formState: { errors },
	} = useFormContext<TimeCapsule>();

	const handleClose = () => {
		clearErrors("password");
		setIsOpen((prev) => ({
			...prev,
			isPasswordOpen: true,
		}));
	};

	return (
		<div className="-translate-y-1/2 pointer-events-auto absolute top-1/2 right-1/2 translate-x-1/2 rounded-md border border-neutral-700 bg-neutral-800/50 p-2 text-neutral-200 hover:bg-neutral-800/70 active:bg-neutral-800/90">
			<div className="flex justify-end">
				<IoClose className="cursor-pointer" onClick={handleClose} />
			</div>
			<p>{errors.password?.message}</p>
		</div>
	);
}

export default TimeCapsuleUIError;

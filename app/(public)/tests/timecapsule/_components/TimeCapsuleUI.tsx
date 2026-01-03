"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import { useAuth } from "@/hooks/auth/useAuth";
import { cn } from "@/lib/utils";
import type { TimeCapsule } from "@/types/tests.type";
import { useTimeCapsuleStore } from "../_libs/zustand";
import TimeCapsuleUIError from "./TimeCapsuleUIError";
import TimeCapsuleUIForm from "./TimeCapsuleUIForm";
import TimeCapsuleUIList from "./TimeCapsuleUIList";
import TimeCapsuleUIModal from "./TimeCapsuleUIModal";
import TimeCapsuleUIPasswordForm from "./TimeCapsuleUIPasswordForm";

export type TimeCapsuleUIState = {
	isFormOpen: boolean;
	isPasswordOpen: boolean;
	isModalOpen: boolean;
	isListOpen: boolean;
	isLogInOpen: boolean;
	isEditNow: boolean;
};

function TimeCapsuleUI() {
	const {
		focusedObject,
		timeCapsules,
		queryStringTimeCapsuleId,
		setFocusedObject,
	} = useTimeCapsuleStore(
		useShallow((state) => ({
			focusedObject: state.focusedObject,
			timeCapsules: state.timeCapsules,
			queryStringTimeCapsuleId: state.queryStringTimeCapsuleId,
			setFocusedObject: state.setFocusedObject,
		})),
	);
	const { user, loginWithProvider, logOut } = useAuth();
	const [isOpen, setIsOpen] = useState<TimeCapsuleUIState>({
		isFormOpen: false,
		isPasswordOpen: false,
		isModalOpen: false,
		isListOpen: false,
		isLogInOpen: false,
		isEditNow: false,
	});
	const methods = useForm<TimeCapsule>();

	const handleClickLogInOrFormOpen = () => {
		setIsOpen((prev) => ({
			...prev,
			isPasswordOpen: false,
			isModalOpen: false,
			isListOpen: false,
			isFormOpen: !!user,
			isLogInOpen: !user,
		}));
	};

	const handleClickListOpen = () => {
		setIsOpen((prev) => ({
			...prev,
			isLogInOpen: false,
			isFormOpen: false,
			isModalOpen: false,
			isPasswordOpen: false,
			isListOpen: !prev.isListOpen,
		}));
	};

	useEffect(() => {
		console.log(focusedObject);
		if (!focusedObject?.timeCapsule) {
			setIsOpen((prev) => ({
				...prev,
				isFormOpen: false,
				isPasswordOpen: false,
				isModalOpen: false,
				isListOpen: false,
				isLogInOpen: false,
			}));
			return;
		}
		setIsOpen((prev) => ({
			...prev,
			isPasswordOpen: !prev.isFormOpen,
		}));
	}, [focusedObject]);

	useEffect(() => {
		if (!timeCapsules || !queryStringTimeCapsuleId) return;
		const timeCapsule = timeCapsules.find(
			(timeCapsule) => timeCapsule.id === queryStringTimeCapsuleId,
		);
		if (timeCapsule) setFocusedObject({ isIdle: true, timeCapsule });
	}, [queryStringTimeCapsuleId, setFocusedObject, timeCapsules]);

	useEffect(() => {
		console.log("user ======>", user);
	}, [user]);

	return (
		<FormProvider {...methods}>
			<div className="pointer-events-none fixed z-50 h-full w-full select-none">
				<div className="absolute top-0 right-0 flex gap-2">
					<button
						type="button"
						className={cn(
							"pointer-events-auto rounded-md border border-neutral-700 bg-neutral-800/50 p-2 text-neutral-200 opacity-0 hover:bg-neutral-800/70 active:bg-neutral-800/90",
							{
								"opacity-100":
									timeCapsules.filter(
										(timeCapsule) => timeCapsule.user_email === user?.email,
									).length > 0,
							},
						)}
						onClick={handleClickListOpen}
					>
						list
					</button>
					<button
						type="button"
						className="pointer-events-auto rounded-md border border-neutral-700 bg-neutral-800/50 p-2 text-neutral-200 hover:bg-neutral-800/70 active:bg-neutral-800/90"
						onClick={handleClickLogInOrFormOpen}
					>
						????
					</button>
					{user && (
						<button
							type="button"
							className="pointer-events-auto rounded-md border border-neutral-700 bg-neutral-800/50 p-2 text-neutral-200 hover:bg-neutral-800/70 active:bg-neutral-800/90"
							onClick={logOut}
						>
							Sign Out
						</button>
					)}
				</div>
				{isOpen.isListOpen && <TimeCapsuleUIList setIsOpen={setIsOpen} />}
				{methods.formState.errors.password?.message && (
					<TimeCapsuleUIError setIsOpen={setIsOpen} />
				)}
				{isOpen.isModalOpen && <TimeCapsuleUIModal setIsOpen={setIsOpen} />}
				{isOpen.isLogInOpen &&
					!methods.formState.errors.password?.message &&
					!user && (
						<div className="pointer-events-auto absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-md border border-neutral-700 bg-neutral-800/50 p-2 text-neutral-200 hover:bg-neutral-800/70 active:bg-neutral-800/90">
							<button
								type="button"
								onClick={() =>
									loginWithProvider("google", "/tests/timecapsule")
								}
							>
								구글로 로그인
							</button>
						</div>
					)}
				{isOpen.isPasswordOpen &&
					!methods.formState.errors.password?.message && (
						<TimeCapsuleUIPasswordForm setIsOpen={setIsOpen} />
					)}
				{isOpen.isFormOpen && (
					<TimeCapsuleUIForm isOpen={isOpen} setIsOpen={setIsOpen} />
				)}
			</div>
		</FormProvider>
	);
}

export default TimeCapsuleUI;

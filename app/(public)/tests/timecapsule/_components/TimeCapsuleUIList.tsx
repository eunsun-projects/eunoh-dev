"use client";

import { format } from "date-fns";
import type { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { useAuth } from "@/hooks/auth/useAuth";
import type { TimeCapsule } from "@/types/tests.type";
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
		<div className="-translate-y-1/2 pointer-events-auto absolute top-1/2 right-1/2 translate-x-1/2 rounded-md border border-neutral-700 bg-neutral-800/50 p-1 text-neutral-200 hover:bg-neutral-800/70 active:bg-neutral-800/90">
			<div className="flex justify-end">
				<IoClose className="cursor-pointer" onClick={handleClose} />
			</div>
			{timeCapsules
				.filter((timeCapsule) => timeCapsule.user_email === user?.email)
				.map((timeCapsule) => (
					<div key={timeCapsule.created_at} className="text-xs">
						<ul className="min-w-[372px]">
							<li className="flex items-center justify-between gap-2">
								<span>{"✔ "}</span>
								<span
									tabIndex={0}
									role="button"
									aria-label="Click to list"
									aria-pressed="false"
									aria-expanded="false"
									aria-haspopup="dialog"
									aria-describedby="click-to-list-description"
									aria-labelledby="click-to-list-title"
									aria-controls="click-to-list-content"
									onKeyUp={handleClickList(timeCapsule)}
									className="w-24 cursor-pointer truncate md:w-28"
									onClick={handleClickList(timeCapsule)}
								>
									{timeCapsule.title}
								</span>
								<span>{" - "}</span>
								<span className="w-36 text-xs md:w-44">
									{format(
										new Date(timeCapsule.created_at),
										"yy-MM-dd HH:mm:ss",
									)}
								</span>
								<span
									tabIndex={0}
									role="button"
									aria-label="Click to edit"
									aria-pressed="false"
									aria-expanded="false"
									aria-haspopup="dialog"
									aria-describedby="click-to-edit-description"
									aria-labelledby="click-to-edit-title"
									aria-controls="click-to-edit-content"
									onKeyUp={handleClickEdit(timeCapsule)}
									className="cursor-pointer"
									onClick={handleClickEdit(timeCapsule)}
								>
									수정
								</span>
								<span
									tabIndex={0}
									role="button"
									aria-label="Click to delete"
									aria-pressed="false"
									aria-expanded="false"
									aria-haspopup="dialog"
									aria-describedby="click-to-delete-description"
									aria-labelledby="click-to-delete-title"
									aria-controls="click-to-delete-content"
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

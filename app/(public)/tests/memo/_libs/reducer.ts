import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import {
	CREATE,
	DELETE,
	type Memo,
	type MemoAction,
	type MemoApp,
	SELECT,
	UPDATE,
} from "../_types/memo.type";

export function getTime() {
	const date = new Date();

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true, // 12시간 형식을 사용하기 위해 true로 설정
	};

	const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(date);

	return formattedDate;
}

export const memoReducer: React.Reducer<MemoApp, MemoAction> = (
	prevState,
	action,
): MemoApp => {
	switch (action.type) {
		case SELECT: {
			return {
				selected: action.payload as string,
				memos: prevState.memos,
			};
		}
		case CREATE: {
			const tempUuid = uuid();
			const newMemo: Memo = {
				id: tempUuid,
				contents: action.payload as string,
				time: getTime(),
			};
			return {
				selected: tempUuid,
				memos: [newMemo, ...prevState.memos],
			};
		}
		case DELETE: {
			const filtered = prevState.memos.filter(
				(memo) => memo.id !== (action.payload as string),
			);
			if (filtered.length === 0) {
				toast.error("한개 이상의 메모는 남겨둬야 합니다!");
				return prevState;
			}
			return {
				selected: filtered[0].id,
				memos: filtered,
			};
		}
		case UPDATE: {
			const mapped = prevState.memos.map<Memo>((memo: Memo) => {
				if (memo.id === prevState.selected) {
					return {
						...memo,
						contents: action.payload as string,
						time: getTime(),
					};
				}
				return memo;
			});
			return {
				selected: prevState.selected,
				memos: mapped,
			};
		}
		default:
			return prevState;
	}
};

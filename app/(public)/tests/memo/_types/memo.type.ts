export interface Memo {
	id: string;
	contents: string;
	time: string;
}

export interface MemoApp {
	selected: string;
	memos: Memo[];
}

export const CREATE = "memo/CREATE";
export const DELETE = "memo/DELETE";
export const UPDATE = "memo/UPDATE";
export const SELECT = "memo/SELECT";

export type ActionType =
	| typeof CREATE
	| typeof DELETE
	| typeof UPDATE
	| typeof SELECT;

interface CreateAction {
	type: typeof CREATE;
	payload: string;
}

interface DeleteAction {
	type: typeof DELETE;
	payload: string;
}

interface SelectAction {
	type: typeof SELECT;
	payload: string;
}

interface UpdateAction {
	type: typeof UPDATE;
	payload: string;
}

export type MemoActionTypes =
	| CreateAction
	| DeleteAction
	| SelectAction
	| UpdateAction;

export interface MemoAction {
	type: ActionType;
	payload: string;
}

export interface MemoAppContextType {
	memos: Memo[];
	selected: string;
	isMobileMenuOpen: boolean;
	isMobile: boolean | undefined;
	toggleMobileMenu: () => void;
	closeMobileMenu: () => void;
	selectMemo: (memoId: string) => void;
	createMemo: (text: string) => void;
	deleteMemo: (memoId: string) => void;
	updateMemo: (memo: string) => void;
}

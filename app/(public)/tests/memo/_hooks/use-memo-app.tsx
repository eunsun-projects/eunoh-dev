"use client";

import {
	createContext,
	type PropsWithChildren,
	useCallback,
	useContext,
	useReducer,
	useState,
} from "react";
import { v4 as uuid } from "uuid";
import { useIsMobileState } from "@/hooks/use-mobile";
import { getTime, memoReducer } from "../_libs/reducer";
import {
	CREATE,
	DELETE,
	type MemoApp,
	type MemoAppContextType,
	SELECT,
	UPDATE,
} from "../_types/memo.type";

export const initialUuid = uuid();

export const initialState: MemoApp = {
	selected: initialUuid,
	memos: [
		{
			id: initialUuid,
			contents: "",
			time: getTime(),
		},
	],
};

const MemoAppContext = createContext<MemoAppContextType>({
	memos: initialState.memos,
	selected: initialState.selected,
	isMobileMenuOpen: false,
	isMobile: false,
	toggleMobileMenu: () => {},
	closeMobileMenu: () => {},
	selectMemo: () => {},
	createMemo: () => {},
	deleteMemo: () => {},
	updateMemo: () => {},
});

export function MemoAppProvider({ children }: PropsWithChildren) {
	const [state, dispatch] = useReducer(memoReducer, initialState);
	const isMobile = useIsMobileState();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = useCallback(() => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	}, [isMobileMenuOpen]);

	const closeMobileMenu = useCallback(() => {
		setIsMobileMenuOpen(false);
	}, []);

	const selectMemo = useCallback((memoId: string) => {
		dispatch({ type: SELECT, payload: memoId });
	}, []);

	const createMemo = useCallback((text: string) => {
		dispatch({ type: CREATE, payload: text });
	}, []);

	const deleteMemo = useCallback((memoId: string) => {
		dispatch({ type: DELETE, payload: memoId });
	}, []);

	const updateMemo = useCallback((memo: string) => {
		dispatch({ type: UPDATE, payload: memo });
	}, []);

	return (
		<MemoAppContext.Provider
			value={{
				memos: state.memos,
				selected: state.selected,
				isMobileMenuOpen,
				isMobile,
				toggleMobileMenu,
				closeMobileMenu,
				selectMemo,
				createMemo,
				deleteMemo,
				updateMemo,
			}}
		>
			{children}
		</MemoAppContext.Provider>
	);
}

function useMemoApp() {
	const context = useContext(MemoAppContext);

	if (context === undefined) {
		throw new Error("useMemoApp must be used within a MemoAppProvider");
	}

	return context;
}

export default useMemoApp;

"use client";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import GoogleLoginButton from "@/app/(admin)/admin/_components/google-login-button";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/auth/useAuth";
import { useThreadsQuery } from "../_hooks/useFourplay";
import ChatShell from "./ChatShell";

function FourplayTemplate() {
	const { user, isPending: isAuthPending, loginWithProvider } = useAuth();
	const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
	const [isNewConversation, setIsNewConversation] = useState(false);

	const { data: threads, isLoading: isThreadsLoading } = useThreadsQuery();

	const handleLogin = async () => {
		try {
			loginWithProvider("google", "/fourplay");
			console.log("loginWithProvider clicked");
		} catch (error) {
			console.error(error);
			alert("로그인 실패");
		}
	};

	useEffect(() => {
		const root = document.documentElement;
		const body = document.body;
		root.style.overscrollBehaviorY = "none";
		body.style.overscrollBehaviorY = "none";
		body.style.overflow = "hidden";

		return () => {
			root.style.overscrollBehaviorY = "auto";
			body.style.overscrollBehaviorY = "auto";
			body.style.overflow = "auto";
		};
	}, []);

	// 비로그인
	if (!user) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<CardTitle>Login Required</CardTitle>
						<CardDescription>Please log in to access Fourplay.</CardDescription>
					</CardHeader>
					<CardContent className="flex justify-center">
						<GoogleLoginButton onClick={handleLogin} />
					</CardContent>
				</Card>
			</div>
		);
	}

	// 로딩 중
	if (isAuthPending) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="space-y-4 text-center">
					<Skeleton className="mx-auto h-8 w-48" />
					<Skeleton className="mx-auto h-4 w-32" />
				</div>
			</div>
		);
	}

	// Admin이 아닌 경우
	if (!user.isAdmin) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<CardTitle>Private Experiment</CardTitle>
						<CardDescription>
							This feature is currently available for administrators only.
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		);
	}

	// 대화 진행 중
	if (selectedThreadId || isNewConversation) {
		return (
			<div className="h-[calc(100vh-182px)]">
				<ChatShell
					threadId={selectedThreadId}
					onThreadCreated={(id) => {
						setSelectedThreadId(id);
						setIsNewConversation(false);
					}}
					onBack={() => {
						setSelectedThreadId(null);
						setIsNewConversation(false);
					}}
				/>
			</div>
		);
	}

	// 스레드 목록 (메인 화면)
	return (
		<div className="container mx-auto max-w-4xl py-8">
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h1 className="font-bold text-3xl">Fourplay</h1>
					<p className="text-muted-foreground">
						Get multi-perspective AI advice for difficult decisions.
					</p>
				</div>
				<Button
					onClick={() => setIsNewConversation(true)}
					className="cursor-pointer gap-2"
				>
					<Plus className="h-4 w-4 cursor-pointer" />
					New Conversation
				</Button>
			</div>

			{isThreadsLoading ? (
				<div className="space-y-4">
					{[1, 2, 3].map((i) => (
						<Skeleton key={i} className="h-24 w-full" />
					))}
				</div>
			) : threads && threads.length > 0 ? (
				<div className="space-y-4">
					{threads.map((thread) => (
						<Card
							key={thread.id}
							className="cursor-pointer transition-colors hover:bg-muted/50"
							onClick={() => setSelectedThreadId(thread.id)}
						>
							<CardHeader>
								<div className="flex items-start justify-between">
									<div>
										<CardTitle className="text-sm">
											{thread.title || "Untitled"}
										</CardTitle>
										<CardDescription>
											{new Date(thread.created_at).toLocaleDateString()}{" "}
											{new Date(thread.created_at).toLocaleTimeString()}
										</CardDescription>
									</div>
									<span
										className={`rounded px-2 py-1 text-xs ${
											thread.status === "completed"
												? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
												: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
										}`}
									>
										{thread.status}
									</span>
								</div>
							</CardHeader>
						</Card>
					))}
				</div>
			) : (
				<Card>
					<CardHeader className="text-center">
						<CardTitle>No conversations yet</CardTitle>
						<CardDescription>
							Start a new conversation to get AI perspectives on your decisions.
						</CardDescription>
					</CardHeader>
				</Card>
			)}
		</div>
	);
}

export default FourplayTemplate;

"use client";

import { useChat } from "@ai-sdk/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultChatTransport } from "ai";
import { Image, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { z } from "zod/v3";
import { useShallow } from "zustand/react/shallow";
import type { MyUIMessage } from "@/app/api/chat/route";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/auth/useAuth";
import {
	useGenTxtImgToImgQuery,
	useGenTxtImgToTxtQuery,
	useGenTxtToImgQuery,
} from "../_hooks/query.hooks";
import { type Model, useUsageCalculatorStore } from "../_libs/zustand";
import ChatTextArea from "./ChatTextArea";

interface MarkdownProps {
	children: React.ReactNode;
	node: React.ReactNode;
}

const formSchema = z.object({
	message: z.string().min(5, { message: "메시지는 5자 이상이어야 합니다." }),
});

type FormValues = z.infer<typeof formSchema>;

function Chat() {
	const [isComposing, setIsComposing] = useState(false);
	const [prompt, setPrompt] = useState<string | null>(null);
	const [generatedImage, setGeneratedImage] = useState<string | null>(null);
	const [formData, setFormData] = useState<FormData | null>(null);
	const [accumulatedText, setAccumulatedText] = useState<string>("");

	const { user } = useAuth();
	const { mode, model, base, setUsage } = useUsageCalculatorStore(
		useShallow((state) => ({
			base: state.base,
			mode: state.mode,
			model: state.model,
			setUsage: state.setUsage,
		})),
	);
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			message: "",
		},
	});

	const selectedModel: Model = base.input_txt_base.model
		? base.input_txt_base.model
		: base.input_image_base.model!;

	const { messages, sendMessage } = useChat<MyUIMessage>({
		transport: new DefaultChatTransport({
			body: {
				model: selectedModel,
			},
		}),
		onFinish: ({ message }) => {
			// Access message metadata via onFinish callback
			if (message.metadata?.totalUsage) {
				console.log(
					"chat usage from finish event ===>",
					message.metadata.totalUsage,
				);
				setUsage(message.metadata.totalUsage);
			}
		},
	});

	const {
		data: txtToImgData,
		status: txtToImgImagesStatus,
		fetchStatus: txtToImgImagesFetchStatus,
		error: txtToImgImagesError,
	} = useGenTxtToImgQuery({
		prompt,
		model,
		mode,
	});

	const {
		data: txtImgToTxtData,
		status: txtImgToTxtStatus,
		fetchStatus: txtImgToTxtFetchStatus,
		error: txtImgToTxtError,
	} = useGenTxtImgToTxtQuery({
		prompt,
		model,
		formData,
		mode,
	});

	const {
		data: txtImgToImgData,
		status: txtImgToImgStatus,
		fetchStatus: txtImgToImgFetchStatus,
		error: txtImgToImgError,
	} = useGenTxtImgToImgQuery({
		formData,
		model,
		prompt,
		mode,
	});

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const countRef = useRef<number>(0);
	const imageInputRef = useRef<HTMLInputElement>(null);
	const imageURLRef = useRef<string | null>(null);

	const resetAll = () => {
		form.reset({ message: "" });
		form.clearErrors("message");
		setAccumulatedText("");
	};

	const handleSubmit = (data: FormValues) => {
		if (!user) {
			toast.error("Please login to use the chat");
			return;
		}
		if (!user.isAdmin) {
			toast.error("Please login as an admin to use the chat");
			return;
		}

		if (mode === "txt-to-image") {
			setPrompt(data.message);
			resetAll();
			return;
			// biome-ignore lint/style/noUselessElse: for mode
		} else if (mode === "txt+image-to-txt") {
			if (!formData) {
				toast.error("Please select an image");
				return;
			}
			setPrompt(data.message);
			setAccumulatedText("");
			resetAll();
			return;
			// biome-ignore lint/style/noUselessElse: for mode
		} else if (mode === "txt+image-to-image") {
			if (!formData) {
				toast.error("Please select an image");
				return;
			}
			setPrompt(data.message);
			setAccumulatedText("");
			resetAll();
			return;
			// biome-ignore lint/style/noUselessElse: for mode
		} else {
			sendMessage({
				text: data.message,
			});
		}

		resetAll();
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.nativeEvent.isComposing || isComposing) return;
		if (e.key === "Enter") {
			e.preventDefault();
			e.currentTarget.form?.requestSubmit();
		}
	};

	const handleComposition = (
		e: React.CompositionEvent<HTMLTextAreaElement>,
	) => {
		if (e.type === "compositionstart") {
			setIsComposing(true);
		} else if (e.type === "compositionend") {
			setIsComposing(false);
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const newFormData = new FormData();
			const file = e.target.files[0];
			const fileURL = URL.createObjectURL(file);
			console.log("fileURL ===>", fileURL);
			imageURLRef.current = fileURL;
			newFormData.append("file", e.target.files[0]);
			setFormData(newFormData);
		}
	};

	useEffect(() => {
		return () => {
			if (imageURLRef.current) {
				URL.revokeObjectURL(imageURLRef.current);
				setFormData(null);
				setPrompt(null);
				setGeneratedImage(null);
				setAccumulatedText("");
				setUsage(null);
			}
		};
	}, [setUsage]);

	useEffect(() => {
		if (messages.length > 0) {
			messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	useEffect(() => {
		console.log("txtToImgData ===>", txtToImgData);
		if (!txtToImgData || txtToImgData.length === 0) return;
		if (countRef.current < txtToImgData.length) {
			setGeneratedImage(txtToImgData[countRef.current].partial_image_b64s[0]);
			if (txtToImgData[countRef.current].status === "partial") {
				countRef.current++;
				return;
			}
			if (txtToImgData[countRef.current].status === "completed") {
				setUsage(txtToImgData[txtToImgData.length - 1].usage ?? null);
				console.log(
					"image usage ===>",
					txtToImgData[txtToImgData.length - 1].usage,
				);
				countRef.current = 0;
				return;
			}
		}
	}, [txtToImgData, setUsage]);

	useEffect(() => {
		console.log("txtImgToTxtData ===>", txtImgToTxtData);
		if (!txtImgToTxtData || txtImgToTxtData.length === 0) {
			if (mode !== "txt+image-to-txt") {
				setAccumulatedText("");
			}
			return;
		}

		const lastChunk = txtImgToTxtData[txtImgToTxtData.length - 1];

		if (lastChunk.status === "partial") {
			const currentAccumulatedText = txtImgToTxtData.reduce((acc, chunk) => {
				if (chunk.status === "completed") return chunk.text;
				return acc + chunk.text;
			}, "");
			setAccumulatedText(currentAccumulatedText);
		} else if (lastChunk.status === "completed") {
			setAccumulatedText(lastChunk.text);
			setUsage(lastChunk.usage ?? null);
			console.log("image+text to text usage ===>", lastChunk.usage);
		}
	}, [txtImgToTxtData, setUsage, mode]);

	useEffect(() => {
		console.log("txtImgToImgData ===>", txtImgToImgData);
		if (!txtImgToImgData || txtImgToImgData.length === 0) return;
		if (countRef.current < txtImgToImgData.length) {
			setGeneratedImage(
				txtImgToImgData[countRef.current].partial_image_b64s[0],
			);
			if (txtImgToImgData[countRef.current].status === "partial") {
				countRef.current++;
				return;
			}
			if (txtImgToImgData[countRef.current].status === "completed") {
				setUsage(txtImgToImgData[txtImgToImgData.length - 1].usage ?? null);
				countRef.current = 0;
				return;
			}
		}
	}, [txtImgToImgData, setUsage]);

	return (
		<div className="flex h-full w-full flex-col gap-2">
			<div className="flex h-auto min-h-[calc(100%-74px)] w-full flex-col items-center justify-center gap-2 overflow-y-auto text-xs">
				{messages.map((m) => (
					<div key={m.id} className="w-full break-keep">
						{m.role === "user" ? (
							<div className="flex min-h-6 w-full justify-end whitespace-pre-wrap rounded-md">
								<p className="flex w-[70%] items-center rounded-md bg-black/30 px-2 text-cyan-400 text-stroke-green">
									<span className="leading-2">
										🍀 User:{" "}
										{m.parts.map((part, i) => {
											switch (part.type) {
												case "text":
													return <span key={`${m.id}-${i}`}>{part.text}</span>;
												default:
													return null;
											}
										})}
									</span>
								</p>
							</div>
						) : (
							<div className="flex min-h-8 w-full flex-col justify-start gap-2">
								<ReactMarkdown
									remarkPlugins={[remarkGfm]}
									components={components}
								>
									{m.parts
										.map((part) => {
											switch (part.type) {
												case "text":
													return part.text;
												default:
													return "";
											}
										})
										.join("")}
								</ReactMarkdown>
							</div>
						)}
					</div>
				))}

				{(txtImgToTxtFetchStatus === "fetching" ||
					txtImgToTxtStatus === "success" ||
					(mode === "txt+image-to-txt" && accumulatedText)) && (
					<div className="w-full break-keep">
						<div className="flex w-full items-center justify-end gap-2">
							{imageURLRef.current && mode === "txt+image-to-txt" && (
								<img
									src={imageURLRef.current}
									alt="for vision model input"
									className="h-[64px] w-[64px] justify-end overflow-hidden rounded-lg transition-shadow duration-300"
								/>
							)}
							{prompt && mode === "txt+image-to-txt" && (
								<div className="flex min-h-6 justify-end whitespace-pre-wrap rounded-md">
									<p className="flex items-center rounded-md bg-black/30 px-2 text-cyan-400 text-stroke-green">
										<span className="leading-2">{`🍀 User: ${prompt}`}</span>
									</p>
								</div>
							)}
						</div>
						{mode === "txt+image-to-txt" && accumulatedText && (
							<div className="flex min-h-8 w-full flex-col justify-start gap-2">
								<ReactMarkdown
									remarkPlugins={[remarkGfm]}
									components={components}
								>
									{accumulatedText}
								</ReactMarkdown>
							</div>
						)}
					</div>
				)}

				{txtToImgImagesFetchStatus === "fetching" && !txtToImgData ? (
					<div className="h-[256px] w-[256px] overflow-hidden rounded-lg transition-shadow duration-300">
						<Skeleton className="h-full w-full" />
					</div>
				) : null}
				{txtToImgData && txtToImgData.length > 0 && (
					<div className="h-[256px] w-[256px] overflow-hidden rounded-lg transition-shadow duration-300">
						<img
							src={`data:image/png;base64,${generatedImage}`}
							alt={"Generated content"}
							className="aspect-square object-cover"
						/>
					</div>
				)}
				{txtImgToImgFetchStatus === "fetching" && !txtImgToImgData ? (
					<div className="h-[256px] w-[256px] overflow-hidden rounded-lg transition-shadow duration-300">
						<Skeleton className="h-full w-full" />
					</div>
				) : null}

				{txtImgToImgData && txtImgToImgData.length > 0 && (
					<div className="h-[256px] w-[256px] overflow-hidden rounded-lg transition-shadow duration-300">
						<img
							src={`data:image/png;base64,${generatedImage}`}
							alt={"Generated content"}
							className="aspect-square object-cover"
						/>
					</div>
				)}

				<div ref={messagesEndRef} />
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="relative bottom-4 left-1/2 h-[60px] w-[90svw] -translate-x-1/2 md:min-w-[680px] lg:w-1/2"
				>
					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem className="w-full space-y-0">
								<FormLabel className="hidden">Message</FormLabel>
								<FormControl>
									<ChatTextArea
										value={field.value}
										onKeyDown={handleKeyDown}
										onCompositionStart={handleComposition}
										onCompositionEnd={handleComposition}
										onChange={(e) => {
											field.onChange(e);
										}}
									/>
								</FormControl>
								<FormDescription className="hidden">
									This is your message.
								</FormDescription>
								<FormMessage className="absolute bottom-0 left-2 text-[10px] text-red-400" />
							</FormItem>
						)}
					/>
					{mode === "txt+image-to-image" || mode === "txt+image-to-txt" ? (
						<input
							type="file"
							ref={imageInputRef}
							className="hidden"
							accept="image/*"
							onChange={handleImageChange}
						/>
					) : null}
					<div className="absolute top-0 right-2 flex h-[60px] w-fll items-center justify-center">
						<div className="flex h-9 w-fit items-center justify-center">
							{mode === "txt+image-to-image" || mode === "txt+image-to-txt" ? (
								<Button
									variant="secondary"
									type="button"
									className="h-full w-9 animate-bounce p-0 hover:bg-neutral-900"
									onClick={() => {
										if (imageInputRef.current) {
											imageInputRef.current.click();
										}
									}}
								>
									<Image className="!size=5" />
								</Button>
							) : null}
							<Button
								variant="secondary"
								type="submit"
								className="h-full w-9 p-0 hover:bg-neutral-900"
							>
								<Send className="!size-5" />
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
}

export default Chat;

const components = {
	p: ({ ...props }: MarkdownProps) => (
		<p className="text-neutral-200" {...props} />
	),
	a: ({ ...props }: MarkdownProps) => (
		<a className="text-neutral-200" {...props} />
	),
	h1: ({ ...props }: MarkdownProps) => (
		<h1 className="text-neutral-200" {...props} />
	),
	h2: ({ ...props }: MarkdownProps) => (
		<h2 className="text-neutral-200" {...props} />
	),
	h3: ({ ...props }: MarkdownProps) => (
		<h3 className="text-neutral-200" {...props} />
	),
	h4: ({ ...props }: MarkdownProps) => (
		<h4 className="text-neutral-200" {...props} />
	),
	h5: ({ ...props }: MarkdownProps) => (
		<h5 className="text-neutral-200" {...props} />
	),
	h6: ({ ...props }: MarkdownProps) => (
		<h6 className="text-neutral-200" {...props} />
	),
	ul: ({ ...props }: MarkdownProps) => (
		<ul className="text-neutral-200" {...props} />
	),
	ol: ({ ...props }: MarkdownProps) => (
		<ol className="text-neutral-200" {...props} />
	),
	li: ({ ...props }: MarkdownProps) => (
		<li className="text-neutral-200" {...props} />
	),
	blockquote: ({ ...props }: MarkdownProps) => (
		<blockquote className="text-neutral-200" {...props} />
	),
	code: ({ ...props }: MarkdownProps) => (
		<code className="text-neutral-200" {...props} />
	),
	img: ({ ...props }: MarkdownProps) => (
		<img
			className="h-full w-full text-neutral-200"
			{...props}
			alt="this is markdown img"
		/>
	),
	pre: ({ ...props }: MarkdownProps) => (
		<pre className="text-neutral-200" {...props} />
	),
	table: ({ ...props }: MarkdownProps) => (
		<table className="text-neutral-200" {...props} />
	),
} as Components;

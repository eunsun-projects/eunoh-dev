"use client";

import { Textarea } from "@/components/ui/textarea";

interface ChatTextAreaProps extends React.ComponentProps<typeof Textarea> {}

function ChatTextArea({ ...props }: ChatTextAreaProps) {
	return (
		<Textarea
			placeholder="메시지를 입력하세요."
			className="h-full w-full resize-none bg-neutral-800 text-neutral-100 text-sm placeholder:text-neutral-400 focus-visible:ring-2"
			{...props}
		/>
	);
}

export default ChatTextArea;

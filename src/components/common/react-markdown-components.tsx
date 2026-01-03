import { Children, cloneElement, isValidElement } from "react";
import type { Components } from "react-markdown";

export interface MarkdownProps {
	children: React.ReactNode;
	node: React.ReactNode;
}

// **텍스트** 패턴을 strong 태그로 변환하는 공통 함수
const processMarkdownText = (
	children: React.ReactNode,
	options?: { addColonBreak?: boolean },
): React.ReactNode => {
	return Children.map(children, (child) => {
		if (isValidElement(child)) {
			// children이 있는 경우 재귀적으로 처리
			const childProps = child.props as {
				children?: React.ReactNode;
			} & Record<string, unknown>;
			if (childProps?.children) {
				return cloneElement(
					child as React.ReactElement<{ children?: React.ReactNode }>,
					{
						...(childProps as Record<string, unknown>),
						children: processMarkdownText(childProps.children, options),
					},
				);
			}
		}
		// 문자열인 경우 **텍스트** 패턴을 strong 태그로 변환
		if (typeof child === "string") {
			// **텍스트** 패턴을 찾아서 strong 태그로 변환
			const strongPattern = /\*\*(.+?)\*\*/g;
			const parts: React.ReactNode[] = [];
			let lastIndex = 0;
			let keyIndex = 0;

			let match = strongPattern.exec(child);
			while (match !== null) {
				// ** 앞의 텍스트 추가
				if (match.index > lastIndex) {
					const beforeText = child.slice(lastIndex, match.index);
					if (beforeText) {
						parts.push(beforeText);
					}
				}
				// strong 태그 추가
				parts.push(
					<strong
						key={`strong-${keyIndex++}`}
						className="font-semibold text-neutral-200"
					>
						{match[1]}
					</strong>,
				);
				lastIndex = match.index + match[0].length;
				match = strongPattern.exec(child);
			}

			// 남은 텍스트 추가
			if (lastIndex < child.length) {
				parts.push(child.slice(lastIndex));
			}

			// 변환이 없었으면 원본 문자열 사용
			if (parts.length === 0) {
				parts.push(child);
			}

			// 콜론 뒤에 줄바꿈 추가 옵션이 있는 경우
			if (options?.addColonBreak) {
				const finalParts: React.ReactNode[] = [];
				parts.forEach((part, index) => {
					if (typeof part === "string") {
						const colonParts = part.split(/(:)/);
						colonParts.forEach((colonPart, colonIndex) => {
							finalParts.push(colonPart);
							if (colonPart === ":" && colonIndex < colonParts.length - 1) {
								finalParts.push(<br key={`colon-br-${index}-${colonIndex}`} />);
							}
						});
					} else {
						finalParts.push(part);
					}
				});
				return finalParts.length > 1 ? finalParts : finalParts[0] || child;
			}

			return parts.length > 1 ? parts : parts[0] || child;
		}
		return child;
	});
};

export const components = {
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

export const fourplayComponents = {
	p: ({ ...props }: MarkdownProps) => (
		<p className="text-neutral-200 text-xs" {...props}>
			{processMarkdownText(props.children)}
		</p>
	),
	a: ({ ...props }: MarkdownProps) => (
		<a className="text-neutral-200" {...props} />
	),
	h1: ({ ...props }: MarkdownProps) => (
		<h1 className="text-lg text-neutral-200" {...props} />
	),
	h2: ({ ...props }: MarkdownProps) => (
		<h2 className="text-neutral-200 text-sm" {...props} />
	),
	h3: ({ ...props }: MarkdownProps) => (
		<h3 className="text-neutral-200 text-sm" {...props} />
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
		<li className="text-neutral-200 text-xs" {...props}>
			{processMarkdownText(props.children, { addColonBreak: true })}
		</li>
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
	hr: ({ ...props }: MarkdownProps) => (
		<hr className="mt-4 mb-4 text-neutral-200" {...props} />
	),
	strong: ({ ...props }: MarkdownProps) => (
		<strong className="font-semibold text-neutral-200" {...props} />
	),
} as Components;

import type {
	IGenTxtImgToTxtStreamData,
	IGenTxtToImgStreamData,
} from "../_hooks/query.hooks";

async function* parseJsonStream<T>(
	stream: ReadableStream<Uint8Array>,
): AsyncIterable<T> {
	const reader = stream.getReader();
	const decoder = new TextDecoder();
	let buffer = "";

	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			buffer += decoder.decode(value, { stream: true });

			let eolIndex = buffer.indexOf("\n");
			while (eolIndex !== -1) {
				const line = buffer.substring(0, eolIndex);
				buffer = buffer.substring(eolIndex + 1);
				if (line.trim().length > 0) {
					try {
						yield JSON.parse(line.trim()) as T;
					} catch (e) {
						console.error("Failed to parse JSON line:", line, e);
						// 에러 발생 시 해당 줄은 건너뛰고 계속 진행합니다.
					}
				}
				eolIndex = buffer.indexOf("\n");
			}
		}
		// 루프 종료 후 남은 버퍼 처리
		if (buffer.trim().length > 0) {
			try {
				yield JSON.parse(buffer.trim()) as T;
			} catch (e) {
				console.error(
					"Failed to parse JSON line (remaining buffer):",
					buffer,
					e,
				);
			}
		}
	} finally {
		reader.releaseLock();
	}
}

export async function* getGenTxtToImgStream(
	model: string,
	prompt: string,
): AsyncIterable<IGenTxtToImgStreamData> {
	if (!prompt) {
		return;
	}

	const response = await fetch(
		`/api/gen/txttoimg?model=${model}&prompt=${encodeURIComponent(prompt)}`,
	);

	if (!response.ok) {
		let errorData = { error: `HTTP error! status: ${response.status}` };
		try {
			const text = await response.text();
			errorData = JSON.parse(text);
		} catch (e) {
			console.error("Failed to parse error JSON:", e);
		}
		throw new Error(
			(errorData as any).message ||
				errorData.error ||
				`HTTP error! status: ${response.status}`,
		);
	}

	if (!response.body) {
		throw new Error("Response body is null");
	}

	yield* parseJsonStream<IGenTxtToImgStreamData>(response.body);
}

export async function* getGenTxtImgToTxtStream(
	model: string,
	prompt: string,
	formData: FormData,
): AsyncIterable<IGenTxtImgToTxtStreamData> {
	if (!prompt) {
		return;
	}

	const response = await fetch(
		`/api/gen/txtimgtotxt?model=${model}&prompt=${encodeURIComponent(prompt)}`,
		{
			method: "POST",
			body: formData,
		},
	);

	if (!response.ok) {
		let errorData = { error: `HTTP error! status: ${response.status}` };
		try {
			const text = await response.text();
			errorData = JSON.parse(text);
		} catch (e) {
			console.error("Failed to parse error JSON:", e);
		}
		throw new Error(
			(errorData as any).message ||
				errorData.error ||
				`HTTP error! status: ${response.status}`,
		);
	}

	if (!response.body) {
		throw new Error("Response body is null");
	}

	yield* parseJsonStream<IGenTxtImgToTxtStreamData>(response.body);
}

export async function* getGenTxtImgToImgStream(
	model: string,
	prompt: string,
	formData: FormData,
): AsyncIterable<IGenTxtToImgStreamData> {
	if (!prompt) {
		return;
	}

	const response = await fetch(
		`/api/gen/txtimgtoimg?model=${model}&prompt=${encodeURIComponent(prompt)}`,
		{
			method: "POST",
			body: formData,
		},
	);

	if (!response.ok) {
		let errorData = { error: `HTTP error! status: ${response.status}` };
		try {
			const text = await response.text();
			errorData = JSON.parse(text);
		} catch (e) {
			console.error("Failed to parse error JSON:", e);
		}
		throw new Error(
			(errorData as any).message ||
				errorData.error ||
				`HTTP error! status: ${response.status}`,
		);
	}

	if (!response.body) {
		throw new Error("Response body is null");
	}

	yield* parseJsonStream<IGenTxtToImgStreamData>(response.body);
}

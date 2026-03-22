/**
 * dev 로그용: base64·긴 문자열을 줄여 터미널/메모리 폭주를 막습니다.
 * (partial_image SSE의 data JSON에 들어 있는 이미지 필드 등)
 */
const SHORT_STRING = 160;
const BASE64ISH_MIN = 400;

function looksLikeLongBase64(s: string): boolean {
	if (s.length < BASE64ISH_MIN) return false;
	const head = s.slice(0, Math.min(400, s.length)).replace(/\s/g, "");
	return /^[A-Za-z0-9+/]+=*$/.test(head);
}

export function summarizeForLog(value: unknown, depth = 0): unknown {
	if (depth > 12) return "[max-depth]";
	if (value === null || value === undefined) return value;
	if (typeof value === "string") {
		const s = value;
		if (looksLikeLongBase64(s)) {
			return `[base64-like string, ${s.length} chars]`;
		}
		if (s.length <= SHORT_STRING) return s;
		return `${s.slice(0, SHORT_STRING)}… (+${s.length - SHORT_STRING} chars)`;
	}
	if (typeof value === "number" || typeof value === "boolean") return value;
	if (typeof value === "bigint") return `${value.toString()}n`;
	if (value instanceof Date) return value.toISOString();
	if (value instanceof Uint8Array) {
		return { uint8ArrayBytes: value.byteLength };
	}
	if (Array.isArray(value)) {
		return value.map((v) => summarizeForLog(v, depth + 1));
	}
	if (typeof value !== "object") return `[${typeof value}]`;

	const obj = value as Record<string, unknown>;

	/** @ai-sdk `GeneratedFile` / `DefaultGeneratedFile` */
	if (
		typeof obj.mediaType === "string" &&
		typeof obj.base64 === "string" &&
		obj.uint8Array instanceof Uint8Array
	) {
		return {
			_kind: "GeneratedFile",
			mediaType: obj.mediaType,
			base64Chars: obj.base64.length,
			bytes: obj.uint8Array.byteLength,
		};
	}

	const out: Record<string, unknown> = {};
	for (const [k, v] of Object.entries(obj)) {
		out[k] = summarizeForLog(v, depth + 1);
	}
	return out;
}

/**
 * `AI_JSONParseError` 등에 붙는 `text`가 SSE(`event:` / `data:`)일 때,
 * 이벤트 종류와 data JSON만 요약해 읽기 쉽게 만듭니다.
 */
export function summarizeSseErrorText(text: string): unknown {
	const trimmed = text.trim();
	if (!trimmed.startsWith("event:")) {
		return summarizeForLog(trimmed);
	}

	const blocks = trimmed.split(/\n\n+/);
	return blocks.map((block) => {
		const lines = block.split("\n").filter(Boolean);
		const row: Record<string, unknown> = {};
		for (const line of lines) {
			if (line.startsWith("event:")) {
				row.event = line.slice(6).trim();
			} else if (line.startsWith("data:")) {
				const raw = line.slice(5).trimStart();
				try {
					const parsed = JSON.parse(raw) as unknown;
					row.data = summarizeForLog(parsed);
				} catch {
					row.data = summarizeForLog(raw);
				}
			} else {
				row._rawLine = summarizeForLog(line);
			}
		}
		return row;
	});
}

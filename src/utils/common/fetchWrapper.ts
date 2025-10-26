import { PUBLIC_URL } from "@/constants/common.constants";

async function parseJsonSafe(response: Response) {
	const contentType = response.headers.get("content-type") || "";
	const isJson = contentType.includes("application/json");
	try {
		if (isJson) return await response.json();
		const text = await response.text();
		return JSON.parse(text);
	} catch {
		return { raw: await response.text() };
	}
}

async function fetchWrapper<T>(url: string, options: RequestInit): Promise<T> {
	const isServer = typeof window === "undefined";
	const base = PUBLIC_URL?.trim();
	const finalUrl = base ? `${base}${url}` : url;
	const response = await fetch(finalUrl, options);

	const payload = await parseJsonSafe(response);

	if (!response.ok && !isServer) {
		const message =
			(payload && (payload.error || payload.message)) ||
			(typeof payload === "string" ? payload : undefined) ||
			"요청 실패";
		throw new Error(message);
	}
	if (!response.ok && isServer) {
		// console.error("error in fetch wrapper ===>", payload);
		throw new Error(payload.error);
	}

	return payload as T;
}

export default fetchWrapper;

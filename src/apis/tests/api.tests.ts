import type {
	SajuTestResponse,
	TimeCapsule,
	TimeCapsuleFromSupabase,
} from "@/types/tests.type";
import fetchWrapper from "@/utils/common/fetchWrapper";

export async function postSajuTest({
	name,
	birth,
}: {
	name: string;
	birth: string;
}) {
	const url = "/api/tests/saju";
	const response = await fetchWrapper<SajuTestResponse>(url, {
		method: "POST",
		body: JSON.stringify({ name, birth }),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
}

export async function postSajuImageTest({ name }: { name: string }) {
	const url = "/api/tests/saju/image";
	const response = await fetchWrapper<SajuTestResponse>(url, {
		method: "POST",
		body: JSON.stringify({ name }),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
}

export async function getTimeCapsules() {
	const url = "/api/tests/timecapsule";
	const data = await fetchWrapper<TimeCapsuleFromSupabase[]>(url, {
		method: "GET",
	});
	return data;
}

export async function postTimeCapsule(timeCapsule: Partial<TimeCapsule>) {
	const url = "/api/tests/timecapsule";
	const data = await fetchWrapper<TimeCapsule>(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(timeCapsule),
	});
	return data;
}

export async function editTimeCapsule(timeCapsule: Partial<TimeCapsule>) {
	const url = "/api/tests/timecapsule";
	const data = await fetchWrapper<TimeCapsule>(url, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(timeCapsule),
	});
	return data;
}

export async function deleteTimeCapsule(timeCapsule: Partial<TimeCapsule>) {
	const url = "/api/tests/timecapsule";
	const data = await fetchWrapper<TimeCapsule>(url, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(timeCapsule),
	});
	return data;
}

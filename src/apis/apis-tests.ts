import axios from "@/lib/axios";
import type {
	SajuTestResponse,
	TimeCapsule,
	TimeCapsuleFromSupabase,
} from "@/types/tests.type";

export async function postSajuTest({
	name,
	birth,
}: {
	name: string;
	birth: string;
}) {
	return axios.post<SajuTestResponse>("/api/tests/saju", { name, birth });
}

export async function postSajuImageTest({ name }: { name: string }) {
	return axios.post<SajuTestResponse>("/api/tests/saju/image", { name });
}

export async function getTimeCapsules() {
	return axios.get<TimeCapsuleFromSupabase[]>("/api/tests/timecapsule");
}

export async function postTimeCapsule(timeCapsule: Partial<TimeCapsule>) {
	return axios.post<TimeCapsule>("/api/tests/timecapsule", timeCapsule);
}

export async function editTimeCapsule(timeCapsule: Partial<TimeCapsule>) {
	return axios.put<TimeCapsule>("/api/tests/timecapsule", timeCapsule);
}

export async function deleteTimeCapsule(timeCapsule: Partial<TimeCapsule>) {
	return axios.delete<TimeCapsule>("/api/tests/timecapsule", {
		data: timeCapsule,
	});
}

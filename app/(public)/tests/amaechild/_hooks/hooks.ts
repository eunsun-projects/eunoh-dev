import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getAllIffies, getIffy, postIffy } from "../_apis/apis";
import {
	POLLING_INTERVAL_MS,
	QUERY_KEY_ALL_GIFTS,
	QUERY_KEY_IFFY,
} from "../_constants/consts";
import useIffyStore from "../_store/store";
import type { AllGiftsResponse, Iffy } from "../_types/types";

export const useAllGiftsQuery = () => {
	return useQuery<AllGiftsResponse, Error>({
		queryKey: [QUERY_KEY_ALL_GIFTS],
		queryFn: getAllIffies,
	});
};

export const useIffyMutation = () => {
	return useMutation<Iffy, Error, { formData: FormData }>({
		mutationFn: ({ formData }: { formData: FormData }) =>
			postIffy({ formData }),
	});
};

export const useIffyQuery = ({ id }: { id: string }) => {
	return useQuery<Iffy, Error>({
		queryKey: [QUERY_KEY_IFFY, id],
		queryFn: () => getIffy({ id }),
		enabled: !!id,
		refetchInterval: (query) => {
			const status = query.state.data?.status;
			if (status === "processing") return POLLING_INTERVAL_MS;
			return false;
		},
	});
};

export function useKakao() {
	const { Kakao, setKakao } = useIffyStore();

	const handleShareToKakao = ({ iffyData }: { iffyData: Iffy }) => {
		if (!window.Kakao || !window.Kakao.Share) {
			alert("카카오톡 공유 기능이 로드되지 않았습니다.");
			return;
		}

		Kakao.Share.sendDefault({
			objectType: "feed",
			content: {
				title: "선물을 사달라는 요청이 왔어요!",
				imageUrl: iffyData.gift_image_url,
				link: {
					webUrl: `${process.env.NEXT_PUBLIC_URL}`,
					mobileWebUrl: `${process.env.NEXT_PUBLIC_URL}`,
				},
			},
			buttons: [
				{
					title: "보러가기",
					link: {
						webUrl: `${process.env.NEXT_PUBLIC_URL}/tests/amaechild/result/${iffyData.id}`,
						mobileWebUrl: `${process.env.NEXT_PUBLIC_URL}/tests/amaechild/result/${iffyData.id}`,
					},
				},
			],
		});
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			const { Kakao } = window;
			if (Kakao) {
				Kakao.cleanup();
				Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
				setKakao(Kakao);
			}
		}
	}, [setKakao]);

	return { handleShareToKakao };
}

export default useKakao;

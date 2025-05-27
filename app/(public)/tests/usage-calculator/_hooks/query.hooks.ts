import type { QueryFunctionContext } from "@tanstack/react-query";
import {
  experimental_streamedQuery as streamedQuery,
  useQuery,
} from "@tanstack/react-query";
import { getGentxttoimgStream } from "../_apis/gen.apis";
import { QUERY_KEY_GEN_TXT_TO_IMG } from "../_constants/gen.const";
import type { IOpenAIResponseUsage } from "../_libs/zustand";

export interface IGenTxtToImgStreamData {
  output_index: number;
  partial_image_b64s: string[];
  usage: IOpenAIResponseUsage | null;
}

interface IGenTxtToImgQueryProps {
  prompt: string | null;
  model: string;
}

export const useGenTxtToImgQuery = ({
  prompt,
  model,
}: IGenTxtToImgQueryProps) => {
  // TQueryKey의 타입을 readonly (string | null)[] 로 명시적으로 지정합니다.
  type TQueryKey = readonly (string | null)[];

  // useQuery의 반환 데이터 타입을 IGenTxtToImgStreamData[]로 변경
  return useQuery<
    IGenTxtToImgStreamData[],
    Error,
    IGenTxtToImgStreamData[],
    TQueryKey
  >({
    queryKey: [QUERY_KEY_GEN_TXT_TO_IMG, prompt, model],
    // streamedQuery의 queryFn은 QueryFunctionContext를 인자로 받고, AsyncIterable을 반환해야 합니다.
    // streamedQuery 자체가 useQuery의 queryFn으로 사용될 수 있는 함수를 반환합니다.
    queryFn: streamedQuery({
      queryFn: (context: QueryFunctionContext<TQueryKey>) => {
        const [, currentPrompt, currentModel] = context.queryKey;
        // enabled: !!prompt 조건으로 인해 이 함수가 호출될 때 currentPrompt는 항상 string일 것으로 예상되지만,
        // 타입 안정성을 위해 명시적으로 확인합니다.
        if (typeof currentPrompt === "string" && currentPrompt) {
          // getGentxttoimgStream은 이제 AsyncIterable<IGenTxtToImgStreamData>를 반환해야 함
          // gen.apis.ts에서 반환 타입을 이미 <any>로 수정했으므로, 여기서 타입 단언을 사용하거나
          // gen.apis.ts의 반환 타입을 더 구체적으로 명시할 수 있습니다.
          // 여기서는 실제 반환되는 객체 타입이므로 호환됩니다.
          return getGentxttoimgStream(
            currentModel || "gpt-4o-mini",
            currentPrompt
          ) as AsyncIterable<IGenTxtToImgStreamData>; // 타입 단언 추가
        }
        // currentPrompt가 유효하지 않으면 빈 AsyncIterable을 반환합니다.
        // 즉시 완료되는 비동기 제너레이터 함수를 반환합니다.
        return (async function* () {})();
      },
    }),
    enabled: !!prompt && !!model,
  });
};

"use client";

import { useUiStateContext } from "@/contexts/UiState.context";
import { useInView } from "react-intersection-observer";
import { ReactTyped } from "react-typed";
import { twMerge } from "tailwind-merge";

function AboutMe() {
    const { mainReady } = useUiStateContext();
    const { ref, inView } = useInView({
        threshold: 0.5,
    });

    return (
        <section
            className={twMerge(
                "relative flex-col items-center justify-center h-dvh transition-opacity opacity-0 duration-1000 hidden w-full",
                mainReady && "flex",
                inView && "opacity-100"
            )}
            ref={ref}
        >
            <div className="flex flex-col items-center justify-start gap-4 w-[90%] h-[84%] pt-10 xl:pt-0 xl:justify-center">
                <div className="flex justify-start w-full h-[6%]">
                    <h2 className="font-bold text-3xl xl:text-5xl">🔥About Me🔥</h2>
                </div>
                <div className="flex flex-col justify-start gap-6 w-full h-[80%] xl:gap-2 xl:px-2">
                    <div className="flex flex-col items-start justify-center gap-4 h-[calc(100%/3)]">
                        <h3 className="font-bold text-2xl xl:text-[1.7rem]">
                            {"> 기본기에 충실한 개발자"}
                        </h3>

                        <p className="text-base xl:text-lg">
                            <ReactTyped
                                startWhenVisible
                                strings={[
                                    "문제를 해결하고 새로운 기술을 습득하는 것을 좋아하며, 항상 기본기에 충실하고자 합니다.",
                                ]}
                                typeSpeed={20}
                            />
                        </p>
                    </div>
                    <div className="flex flex-col items-start justify-center gap-4 h-[calc(100%/3)]">
                        <h3 className="font-bold text-2xl xl:text-[1.7rem]">
                            {"> 소통을 중요시하는 개발자"}
                        </h3>
                        <p className="text-base xl:text-lg">
                            <ReactTyped
                                startWhenVisible
                                strings={[
                                    "팀원들과 소통하고 협업하는 것을 즐깁니다. 무엇보다 중요한 것은 커뮤니케이션 능력이라고 생각합니다.",
                                ]}
                                typeSpeed={20}
                            />
                        </p>
                    </div>
                    <div className="flex flex-col items-start justify-center gap-4 h-[calc(100%/3)]">
                        <h3 className="font-bold text-2xl xl:text-[1.7rem]">
                            {"> 사용자를 생각하는 개발자"}
                        </h3>
                        <p className="text-base xl:text-lg">
                            <ReactTyped
                                startWhenVisible
                                strings={[
                                    "항상 사용자의 관점에서 생각하며, 더욱 편리하고 매력적인 인터페이스를 제공하기 위해 노력하고 있습니다.",
                                ]}
                                typeSpeed={20}
                            />
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;

"use client";

import { useUiStateContext } from "@/contexts/UiState.context";
import { FaCss3Alt, FaDiscord, FaGithub, FaHtml5, FaJs, FaReact, FaSass, FaSlack } from "react-icons/fa";
import { GiZeppelin } from "react-icons/gi";
import { IoLogoFigma, IoLogoFirebase, IoLogoVercel } from "react-icons/io5";
import { RiNextjsFill, RiSupabaseFill, RiTailwindCssFill, RiVuejsFill } from "react-icons/ri";
import {
    SiAdobeillustrator,
    SiAdobephotoshop,
    SiAdobepremierepro,
    SiBlender,
    SiNotion,
    SiOpenai,
    SiReactquery,
    SiStyledcomponents,
    SiSvelte,
    SiTypescript,
} from "react-icons/si";
import { TbBrandRedux } from "react-icons/tb";
import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";

function SkillsAndTools() {
    const { mainReady } = useUiStateContext();
    const { ref, inView } = useInView({
        threshold: 0.3,
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
            <div className="flex flex-col items-center justify-start gap-8 w-[90%] h-[84%] pt-10 xl:pt-0 xl:justify-center">
                <div className="flex justify-center w-full h-[6%]">
                    <h2 className="font-bold text-3xl xl:text-5xl">{"🛠️Skills & Tools🛠️"}</h2>
                </div>
                <div className="flex flex-col items-center justify-center gap-6 xl:gap-10 w-full h-[70%] xl:px-2">
                    <div className="flex flex-col items-center justify-center gap-3 xl:gap-6 w-full text-4xl xl:text-5xl">
                        <h3 className="font-bold text-2xl xl:text-[1.7rem]">{"> frontend"}</h3>
                        <div className="grid grid-cols-8 gap-3">
                            <FaHtml5 />
                            <FaCss3Alt />
                            <FaJs />
                            <FaReact />
                            <SiTypescript />
                            <RiTailwindCssFill />
                            <FaSass />
                            <SiStyledcomponents />
                            <TbBrandRedux />
                            <SiSvelte />
                            <RiNextjsFill />
                            <RiVuejsFill />
                            <SiReactquery />
                            <IoLogoFirebase />
                            <RiSupabaseFill />
                            <IoLogoVercel />
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-3 xl:gap-6  w-full text-4xl xl:text-5xl">
                        <h3 className="font-bold text-2xl xl:text-[1.7rem]">{"> co-working"}</h3>
                        <div className="flex gap-3">
                            <FaSlack />
                            <GiZeppelin />
                            <SiNotion />
                            <IoLogoFigma />
                            <FaGithub />
                            <FaDiscord />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3 xl:gap-6  w-full text-4xl xl:text-5xl">
                        <h3 className="font-bold text-2xl xl:text-[1.7rem]">{"> others"}</h3>
                        <div className="flex gap-3">
                            <SiAdobephotoshop />
                            <SiAdobeillustrator />
                            <SiAdobepremierepro />
                            <SiBlender />
                            <SiOpenai />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SkillsAndTools;

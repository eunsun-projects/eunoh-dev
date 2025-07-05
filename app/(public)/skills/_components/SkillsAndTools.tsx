"use client";

import { BiLogoTypescript } from "react-icons/bi";
import {
  FaCss3Alt,
  FaDiscord,
  FaGithub,
  FaHtml5,
  FaJs,
  FaReact,
  FaSass,
  FaSlack,
} from "react-icons/fa";
import { GiZeppelin } from "react-icons/gi";
import { IoLogoFigma, IoLogoFirebase } from "react-icons/io5";
import { PiFramerLogoFill } from "react-icons/pi";
import {
  RiNextjsFill,
  RiSupabaseFill,
  RiTailwindCssFill,
  RiVuejsFill,
} from "react-icons/ri";
import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiBlender,
  SiGraphql,
  SiJira,
  SiNotion,
  SiOpenai,
  SiReacthookform,
  SiReactquery,
  SiStyledcomponents,
  SiSvelte,
  SiSwagger,
  SiTurborepo,
} from "react-icons/si";
import { TbBrandRedux, TbBrandThreejs } from "react-icons/tb";
import { Zustand } from "../../_components/svgs";
import { Back } from "../../_components/ui";

function SkillsAndTools() {
  return (
    <section>
      <div className="w-full flex flex-col justify-start gap-8">
        <div className="flex justify-between w-full">
          <h2 className="font-bold text-neutral-900 dark:text-neutral-50 text-lg">
            {"🛠️ Skills & Tools 🛠️"}
          </h2>
          <Back isDarkLightModeButton />
        </div>
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-2 w-full">
            <p className="flex flex-col font-bold">{"> frontend : "}</p>
            <div className="flex flex-col gap-2 text-[9px] xl:text-xs">
              <div className="flex items-center gap-1">
                <FaHtml5 className="text-neutral-900 dark:text-neutral-50 text-lg" />
                <span className="text-neutral-900 dark:text-neutral-50 text-xs">
                  {"html"}
                </span>
                <span>
                  {
                    "- 시맨틱 태그를 활용하여 접근성을 고려한 구조를 설계합니다."
                  }
                </span>
              </div>
              <div className="flex items-center gap-1">
                <FaCss3Alt className="text-neutral-900 dark:text-neutral-50 text-lg" />
                <span className="text-neutral-900 dark:text-neutral-50">
                  {"css"}
                </span>
                <span>{"- 반응형, 키프레임, 다양한 선택자에 익숙합니다."}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaJs className="text-neutral-900 dark:text-neutral-50 text-lg" />
                <span className="text-neutral-900 dark:text-neutral-50">
                  {"js"}
                </span>
                <span>{"- 비동기, ES6+, web api 사용에 익숙합니다."}</span>
              </div>
              <div className="flex items-center gap-1">
                <BiLogoTypescript className="text-neutral-900 dark:text-neutral-50 text-lg" />
                <span className="text-neutral-900 dark:text-neutral-50">
                  {"ts"}
                </span>
                <span>
                  {
                    "- 제네릭, 유틸리티 타입 등을 활용하여 안전한 코드를 작성합니다."
                  }
                </span>
              </div>
              <div className="flex items-center gap-1">
                <RiTailwindCssFill className="text-neutral-900 dark:text-neutral-50 text-base" />
                <span className="text-neutral-900 dark:text-neutral-50">
                  {"tailwind"}
                </span>
                <span>{"- 유틸리티 클래스 커스터마이징에 익숙합니다."}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaSass className="text-neutral-900 dark:text-neutral-50 text-lg" />
                <span className="text-neutral-900 dark:text-neutral-50">
                  {"sass"}
                </span>
                <span>
                  {"- 변수, 중첩, 믹스인을 활용하여 까다로운 UI를 구현합니다."}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <SiStyledcomponents className="text-neutral-900 dark:text-neutral-50 text-lg" />
                <span className="text-neutral-900 dark:text-neutral-50">
                  {"styled-components"}
                </span>
                <span>{"- 필요한 경우 동적 스타일링을 위해 사용합니다."}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaReact className="text-neutral-900 dark:text-neutral-50 text-lg" />
                <span className="text-neutral-900 dark:text-neutral-50">
                  {"react"}
                </span>
                <span>{"- react 19 스터디 중 입니다."}</span>
              </div>
              <div className="flex items-center gap-1">
                <SiSvelte className="text-neutral-900 dark:text-neutral-50 text-lg" />
                <span className="text-neutral-900 dark:text-neutral-50">
                  {"svelte"}
                </span>
                <span>
                  {"- svelte-kit 을 사용한 프로젝트 경험이 있습니다."}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <RiNextjsFill className="text-neutral-900 dark:text-neutral-50 text-lg" />
                <span className="text-neutral-900 dark:text-neutral-50">
                  {"next"}
                </span>
                <span>
                  {"- SSG, ISR, SSR, CSR 을 최적화하여 사용할 수 있습니다."}
                </span>
              </div>
              <div className="flex items-center gap-1 ">
                <RiVuejsFill className="text-neutral-900 dark:text-neutral-50 text-lg" />
                <span className="text-neutral-900 dark:text-neutral-50">
                  {"vue"}
                </span>
                <span>{"- vue3 를 사용한 프로젝트 경험이 있습니다."}</span>
              </div>
              <div className="flex items-center gap-1">
                <SiReactquery className="text-neutral-900 dark:text-neutral-50 text-lg" />
                <span className="text-neutral-900 dark:text-neutral-50">
                  {"react-query"}
                </span>
                <span>
                  {"- prefetch, infinite, optimistic 등을 자유롭게 사용합니다."}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <TbBrandRedux className="text-neutral-900 dark:text-neutral-50 text-lg" />
                <span className="text-neutral-900 dark:text-neutral-50">
                  {"redux"}
                </span>
                <span>
                  {
                    "- RTK, thunk, saga 등을 활용하여 상태 관리를 할 수 있습니다."
                  }
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Zustand className="text-neutral-900 dark:text-neutral-50 w-4 h-4" />
                <span className="text-neutral-900 dark:text-neutral-50">
                  {"zustand"}
                </span>
                <span>{"- 가볍고 쉽게 전역상태관리를 수행합니다."}</span>
              </div>
              <div className="flex items-center gap-1">
                <SiReacthookform className="text-neutral-900 dark:text-neutral-50 text-base" />
                <span className="text-neutral-900 dark:text-neutral-50">
                  {"react-hook-form"}
                </span>
                <span>{"- form 관리를 효율적으로 할 수 있습니다."}</span>
              </div>
              <div className="flex items-center gap-1">
                <PiFramerLogoFill className="text-neutral-900 dark:text-neutral-50 text-base" />
                <span className="text-neutral-900 dark:text-neutral-50">
                  {"framer-motion"}
                </span>
                <span>{"- 복잡한 애니메이션을 손쉽게 구현합니다."}</span>
              </div>
              <div className="flex items-center gap-1">
                <SiTurborepo className="text-neutral-900 dark:text-neutral-50 text-base" />
                <span className="text-neutral-900 dark:text-neutral-50">
                  {"turborepo"}
                </span>
                <span>
                  {"- 모노레포 프로젝트를 효율적으로 관리할 수 있습니다."}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <TbBrandThreejs className="text-neutral-900 dark:text-neutral-50 text-base" />
                <span className="text-neutral-900 dark:text-neutral-50">
                  {"three.js"}
                </span>
                <span>{"- 웹에서 3D 환경을 구현할 수 있습니다."}</span>
              </div>
              <div className="flex items-center gap-1">
                <IoLogoFirebase className="text-neutral-900 dark:text-neutral-50 text-base" />
                <span className="text-neutral-900 dark:text-neutral-50">
                  {"firebase"}
                </span>
                <span>
                  {"- firestore, auth, storage, realtime 에 익숙합니다."}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <RiSupabaseFill className="text-neutral-900 dark:text-neutral-50 text-lg" />
                <span className="text-neutral-900 dark:text-neutral-50">
                  {"supabase"}
                </span>
                <span>
                  {"- postgres, realtime, auth, storage 에 익숙합니다."}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <SiGraphql className="text-neutral-900 dark:text-neutral-50 text-lg" />
                <span className="text-neutral-900 dark:text-neutral-50">
                  {"graphql"}
                </span>
                <span>{"- graphql 을 사용한 프로젝트 경험이 있습니다."}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <p className="flex flex-col font-bold">{"> co-working : "}</p>
            <div className="flex flex-col gap-2 text-lg">
              <div className="flex flex-row gap-2">
                <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                  <FaSlack />
                  <span className="text-xs">{"slack"}</span>
                </div>
                <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                  <GiZeppelin />
                  <span className="text-xs">{"zeppelin"}</span>
                </div>
                <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50 text-base">
                  <SiNotion />
                  <span className="text-xs">{"notion"}</span>
                </div>
                <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50 text-base">
                  <IoLogoFigma />
                  <span className="text-xs">{"figma"}</span>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                  <FaGithub />
                  <span className="text-xs">{"github"}</span>
                </div>
                <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                  <FaDiscord />
                  <span className="text-xs">{"discord"}</span>
                </div>
                <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50 text-base">
                  <SiJira />
                  <span className="text-xs">{"jira"}</span>
                </div>
                <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                  <SiSwagger />
                  <span className="text-xs">{"swagger"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <p className="flex flex-col font-bold">{"> others : "}</p>
            <div className="flex flex-col xl:flex-row gap-2 text-lg">
              <div className="flex flex-row gap-2">
                <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                  <SiAdobephotoshop />
                  <span className="text-xs">{"photoshop"}</span>
                </div>
                <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                  <SiAdobeillustrator />
                  <span className="text-xs">{"illustrator"}</span>
                </div>
                <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                  <SiAdobepremierepro />
                  <span className="text-xs">{"premiere"}</span>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                  <SiBlender />
                  <span className="text-xs">{"blender"}</span>
                </div>
                <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                  <SiOpenai />
                  <span className="text-xs">{"openai"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsAndTools;

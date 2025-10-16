"use client";

import { cn } from "@/lib/utils";
import { BiLogoTypescript } from "react-icons/bi";
import { BiLogoPostgresql } from "react-icons/bi";
import {
  FaConfluence,
  FaCss3Alt,
  FaDiscord,
  FaGithub,
  FaHtml5,
  FaJs,
  FaReact,
  FaSass,
  FaSlack,
} from "react-icons/fa";
import { IoLogoFigma, IoLogoFirebase } from "react-icons/io5";
import { LiaNode } from "react-icons/lia";
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
  SiDocker,
  SiDrizzle,
  SiFastapi,
  SiGraphql,
  SiHasura,
  SiJira,
  SiMysql,
  SiNestjs,
  SiNotion,
  SiPrisma,
  SiReacthookform,
  SiReactquery,
  SiStyledcomponents,
  SiSvelte,
  SiSwagger,
  SiTerraform,
  SiTurborepo,
} from "react-icons/si";
import { TbBrandRedux, TbBrandThreejs } from "react-icons/tb";
import { Zustand } from "../../_components/svgs";
import { Back } from "../../_components/ui";

// 스킬 데이터 타입 정의
interface SkillItem {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  description: string;
}

interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

// 스킬 데이터 배열
const skillsData: SkillCategory[] = [
  {
    title: "frontend",
    skills: [
      {
        icon: FaHtml5,
        name: "html",
        description:
          "시맨틱 태그를 활용하여 접근성을 고려한 구조를 설계합니다.",
      },
      {
        icon: FaCss3Alt,
        name: "css",
        description: "반응형, 키프레임, 다양한 선택자에 익숙합니다.",
      },
      {
        icon: FaJs,
        name: "js",
        description: "비동기, ES6+, web api 사용에 익숙합니다.",
      },
      {
        icon: BiLogoTypescript,
        name: "ts",
        description:
          "제네릭, 유틸리티 타입 등을 활용하여 안전한 코드를 작성합니다.",
      },
      {
        icon: RiTailwindCssFill,
        name: "tailwind",
        description: "유틸리티 클래스 커스터마이징에 익숙합니다.",
      },
      {
        icon: FaSass,
        name: "sass",
        description: "변수, 중첩, 믹스인을 활용하여 까다로운 UI를 구현합니다.",
      },
      {
        icon: SiStyledcomponents,
        name: "styled-components",
        description: "필요한 경우 동적 스타일링을 위해 사용합니다.",
      },
      {
        icon: FaReact,
        name: "react",
        description: "react 19 신문법에 익숙합니다.",
      },
      {
        icon: SiSvelte,
        name: "svelte",
        description: "svelte-kit을 사용한 프로젝트 경험이 있습니다.",
      },
      {
        icon: RiNextjsFill,
        name: "next",
        description: "SSG, ISR, SSR, CSR을 최적화하여 사용할 수 있습니다.",
      },
      {
        icon: RiVuejsFill,
        name: "vue",
        description: "vue3를 사용한 프로젝트 경험이 있습니다.",
      },
      {
        icon: SiReactquery,
        name: "react-query",
        description: "prefetch, infinite, optimistic 등을 자유롭게 사용합니다.",
      },
      {
        icon: TbBrandRedux,
        name: "redux",
        description:
          "RTK, thunk, saga 등을 활용하여 상태 관리를 할 수 있습니다.",
      },
      {
        icon: Zustand,
        name: "zustand",
        description: "가볍고 쉽게 전역상태관리를 수행합니다.",
      },
      {
        icon: SiReacthookform,
        name: "react-hook-form",
        description: "form 관리를 효율적으로 할 수 있습니다.",
      },
      {
        icon: PiFramerLogoFill,
        name: "framer-motion",
        description: "복잡한 애니메이션을 손쉽게 구현합니다.",
      },
      {
        icon: SiTurborepo,
        name: "turborepo",
        description: "모노레포 프로젝트를 효율적으로 관리할 수 있습니다.",
      },
      {
        icon: TbBrandThreejs,
        name: "three.js",
        description: "웹에서 3D 환경을 구현할 수 있습니다.",
      },
      {
        icon: SiGraphql,
        name: "graphql",
        description: "graphql을 사용한 프로젝트 경험이 있습니다.",
      },
      {
        icon: SiHasura,
        name: "hasura",
        description: "hasura를 사용한 프로젝트 경험이 있습니다.",
      },
    ],
  },
  {
    title: "backend",
    skills: [
      {
        icon: LiaNode,
        name: "node.js",
        description: "node.js, express를 사용하여 REST를 구축할 수 있습니다.",
      },
      {
        icon: SiNestjs,
        name: "nest.js",
        description: "nest.js를 사용하여 REST를 구축할 수 있습니다.",
      },
      {
        icon: SiFastapi,
        name: "fastapi",
        description: "fastapi를 사용하여 REST를 구축할 수 있습니다.",
      },
      {
        icon: SiDrizzle,
        name: "drizzle",
        description:
          "drizzle-orm을 사용하여 데이터베이스를 관리할 수 있습니다.",
      },
      {
        icon: SiPrisma,
        name: "prisma",
        description: "prisma를 사용하여 데이터베이스를 관리할 수 있습니다.",
      },
      {
        icon: BiLogoPostgresql,
        name: "postgresql",
        description: "postgresql을 사용하여 데이터베이스를 관리할 수 있습니다.",
      },
      {
        icon: SiMysql,
        name: "mysql",
        description: "mysql을 사용하여 데이터베이스를 관리할 수 있습니다.",
      },
      {
        icon: SiTerraform,
        name: "terraform",
        description: "terraform을 사용하여 인프라를 관리할 수 있습니다.",
      },
      {
        icon: SiDocker,
        name: "docker",
        description: "docker를 사용하여 컨테이너를 관리할 수 있습니다.",
      },
      {
        icon: IoLogoFirebase,
        name: "firebase",
        description: "firestore, auth, storage, realtime 에 익숙합니다.",
      },
      {
        icon: RiSupabaseFill,
        name: "supabase",
        description: "postgres, realtime, auth, storage 에 익숙합니다.",
      },
    ],
  },
];

// 협업 도구 데이터
const collaborationTools = [
  { icon: FaSlack, name: "slack" },
  { icon: FaConfluence, name: "confluence" },
  { icon: SiNotion, name: "notion" },
  { icon: IoLogoFigma, name: "figma" },
  { icon: FaGithub, name: "github" },
  { icon: FaDiscord, name: "discord" },
  { icon: SiJira, name: "jira" },
  { icon: SiSwagger, name: "swagger" },
];

// 기타 도구 데이터
const otherTools = [
  { icon: SiAdobephotoshop, name: "photoshop" },
  { icon: SiAdobeillustrator, name: "illustrator" },
  { icon: SiAdobepremierepro, name: "premiere" },
  { icon: SiBlender, name: "blender" },
];

// 스킬 아이템 컴포넌트
const SkillItem = ({
  skill,
  className,
}: { skill: SkillItem; className?: string }) => {
  const IconComponent = skill.icon;
  return (
    <div className="flex items-center gap-1">
      <IconComponent
        className={cn(
          "text-neutral-900 dark:text-neutral-50 text-lg",
          className,
        )}
      />
      <span className="text-neutral-900 dark:text-neutral-50 text-xs">
        {skill.name}
      </span>
      <span>{`- ${skill.description}`}</span>
    </div>
  );
};

// 협업 도구 아이템 컴포넌트
const CollaborationToolItem = ({
  tool,
}: {
  tool: { icon: React.ComponentType<{ className?: string }>; name: string };
}) => {
  const IconComponent = tool.icon;
  return (
    <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
      <IconComponent />
      <span className="text-xs">{tool.name}</span>
    </div>
  );
};

// 기타 도구 아이템 컴포넌트
const OtherToolItem = ({
  tool,
}: {
  tool: { icon: React.ComponentType<{ className?: string }>; name: string };
}) => {
  const IconComponent = tool.icon;
  return (
    <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
      <IconComponent />
      <span className="text-xs">{tool.name}</span>
    </div>
  );
};

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
          {/* 스킬 카테고리 렌더링 */}
          {skillsData.map((category) => (
            <div key={category.title} className="flex flex-col gap-2 w-full">
              <p className="flex flex-col font-bold">{`> ${category.title} : `}</p>
              <div className="flex flex-col gap-2 text-[9px] xl:text-xs">
                {category.skills.map((skill, index) => (
                  <SkillItem
                    key={`${category.title}-${index}`}
                    skill={skill}
                    className={skill.name === "zustand" ? "w-4 h-4" : ""}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* 협업 도구 섹션 */}
          <div className="flex flex-col gap-3 w-full">
            <p className="flex flex-col font-bold">{"> co-working : "}</p>
            <div className="flex flex-col gap-2 text-lg">
              <div className="flex flex-row gap-2">
                {collaborationTools.slice(0, 4).map((tool) => (
                  <CollaborationToolItem
                    key={`collab-${tool.name}`}
                    tool={tool}
                  />
                ))}
              </div>
              <div className="flex flex-row gap-2">
                {collaborationTools.slice(4).map((tool) => (
                  <CollaborationToolItem
                    key={`collab-${tool.name}`}
                    tool={tool}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 기타 도구 섹션 */}
          <div className="flex flex-col gap-3 w-full">
            <p className="flex flex-col font-bold">{"> others : "}</p>
            <div className="flex flex-col xl:flex-row gap-2 text-lg">
              <div className="flex flex-row gap-2">
                {otherTools.slice(0, 3).map((tool) => (
                  <OtherToolItem key={`other-${tool.name}`} tool={tool} />
                ))}
              </div>
              <div className="flex flex-row gap-2">
                {otherTools.slice(3).map((tool) => (
                  <OtherToolItem key={`other-${tool.name}`} tool={tool} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsAndTools;

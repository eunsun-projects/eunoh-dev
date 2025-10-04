"use client";

import Link from "next/link";
import { Back } from "../../_components/ui";

const testLists = [
  {
    id: 1,
    title: "3D Viewer",
    description: "웹 GLB, FBX, OBJ 파일 뷰어",
    href: "/tests/3dviewer",
  },
  {
    id: 2,
    title: "Circles",
    description: "조이스틱으로 가상 공간 탐험",
    href: "/tests/circles",
  },
  {
    id: 3,
    title: "Modernmove",
    description: "vaporwave 디스플레이",
    href: "/tests/modernmove",
  },
  {
    id: 4,
    title: "Scrolling-wave",
    description: "간단한 유저 트리거 애니메이션",
    href: "/tests/scrolling-wave",
  },
  {
    id: 5,
    title: "Sound FX",
    description: "Web Audio API 테스트",
    href: "/tests/soundfx",
  },
  {
    id: 6,
    title: "Paradise",
    description: "위치기반 군중 게임 프로토타입",
    href: "/tests/paradise",
  },
  {
    id: 7,
    title: "Matterport SDK",
    description: "Matterport SDK 테스트",
    href: "/tests/mpsdk",
  },
  {
    id: 8,
    title: "Time Capsule",
    description: "별 타임캡슐 테스트",
    href: "/tests/timecapsule",
  },
  {
    id: 9,
    title: "Chat",
    description: "Chat Stream 테스트",
    href: "/tests/chat",
  },
  {
    id: 10,
    title: "usage-calculator",
    description: "LLM API 사용량 계산기",
    href: "/tests/usage-calculator",
  },
  {
    id: 11,
    title: "애매한이날",
    description: "어린이날 선물 받아도 될까?",
    href: "https://iffygiftyday.vercel.app/",
  },
  {
    id: 12,
    title: "memomemo",
    description: "맥 메모앱 클론 테스트",
    href: "https://memoapp-study.vercel.app/",
  },
  {
    id: 13,
    title: "toaster",
    description: "토스트 잘되나~?",
    href: "https://toast-study.vercel.app/",
  },
  {
    id: 14,
    title: "fluids",
    description: "원샷 프롬프트 - 연기",
    href: "/tests/fluids",
  },
  {
    id: 15,
    title: "candle",
    description: "원샷 프롬프트 - 촛불",
    href: "/tests/candle",
  },
];

function TestListTemplate() {
  return (
    <section>
      <div className="w-full flex flex-col justify-start gap-8">
        <div className="flex justify-between w-full">
          <h2 className="font-bold text-neutral-900 dark:text-neutral-50 text-lg m-0">
            {"🧪 Tests 🧪"}
          </h2>
          <Back isDarkLightModeButton />
        </div>
        <div className="flex flex-col gap-3 w-full">
          {testLists.map((test, index) => (
            <div key={test.id} className="w-full flex justify-between">
              <div className="flex flex-row gap-0 w-[90%] xl:gap-2">
                {index === 2 || index === 6 ? (
                  <a href={test.href} className="min-w-40 xl:min-w-44">
                    <h3 className="w-fit text-neutral-900 dark:text-neutral-50 text-xs m-0 p-0.5 dark:hover:bg-neutral-500 hover:bg-neutral-300 hover:rounded-sm transition-all duration-200">
                      {test.title}
                    </h3>
                  </a>
                ) : (
                  <Link href={test.href} className="min-w-40 xl:min-w-44">
                    <h3 className="w-fit text-neutral-900 dark:text-neutral-50 text-xs m-0 p-0.5 dark:hover:bg-neutral-500 hover:bg-neutral-300 hover:rounded-sm transition-all duration-200">
                      {test.title}
                    </h3>
                  </Link>
                )}
                <p className="flex flex-row gap-1 text-[10px] xl:text-xs">
                  <span>{"- "}</span>
                  <span className="m-0">{test.description}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestListTemplate;

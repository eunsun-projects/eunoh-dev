'use client';

import {
  FaCss3Alt,
  FaDiscord,
  FaGithub,
  FaHtml5,
  FaJs,
  FaReact,
  FaSass,
  FaSlack,
} from 'react-icons/fa';
import { GiZeppelin } from 'react-icons/gi';
import { IoLogoFigma, IoLogoFirebase } from 'react-icons/io5';
import { RiNextjsFill, RiSupabaseFill, RiTailwindCssFill, RiVuejsFill } from 'react-icons/ri';
import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiBlender,
  SiJira,
  SiNotion,
  SiOpenai,
  SiReactquery,
  SiStyledcomponents,
  SiSvelte,
  SiTypescript,
} from 'react-icons/si';
import { TbBrandRedux } from 'react-icons/tb';

function SkillsAndTools() {
  return (
    <section>
      <div className="flex flex-col justify-start gap-8 w-[90%] h-[84%] pt-10 xl:pt-0 xl:justify-center">
        <div className="flex justify-start w-full">
          <h2 className="font-bold text-neutral-900 dark:text-neutral-50 text-lg">
            {'🛠️ Skills & Tools 🛠️'}
          </h2>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-2 w-full">
            <p className="flex flex-col font-bold">{'> frontend : '}</p>
            <div className="flex flex-col gap-2 text-lg">
              <div className="flex items-center gap-1">
                <FaHtml5 className="text-neutral-900 dark:text-neutral-50" />
                <span className="text-xs text-neutral-900 dark:text-neutral-50">{'html'}</span>
                <span className="text-xs">
                  {'- 시맨틱 태그를 활용하여 접근성을 고려한 구조를 설계할 수 있습니다.'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <FaCss3Alt className="text-neutral-900 dark:text-neutral-50" />
                <span className="text-xs text-neutral-900 dark:text-neutral-50">{'css'}</span>
                <span className="text-xs">{'- 반응형, 키프레임, 다양한 선택자에 익숙합니다.'}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaJs className="text-neutral-900 dark:text-neutral-50" />
                <span className="text-xs text-neutral-900 dark:text-neutral-50">{'js'}</span>
                <span className="text-xs">
                  {'- 비동기 핸들링, ES6+, web api 사용에 익숙합니다.'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <SiTypescript className="text-neutral-900 dark:text-neutral-50" />
                <span className="text-xs text-neutral-900 dark:text-neutral-50">{'ts'}</span>
                <span className="text-xs">
                  {
                    '- 제네릭, 유틸리티 타입 등을 활용하여 안전하고 예측 가능한 코드를 작성합 수 있습니다.'
                  }
                </span>
              </div>
              <div className="flex items-center gap-1">
                <FaReact className="text-neutral-900 dark:text-neutral-50" />
                <span className="text-xs text-neutral-900 dark:text-neutral-50">{'react'}</span>
                <span className="text-xs">{'- react 19 스터디 중 입니다.'}</span>
              </div>
              <div className="flex items-center gap-1">
                <RiTailwindCssFill className="text-neutral-900 dark:text-neutral-50" />
                <span className="text-xs text-neutral-900 dark:text-neutral-50">{'tailwind'}</span>
                <span className="text-xs">{'- 유틸리티 클래스 커스터마이징에 익숙합니다.'}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaSass className="text-neutral-900 dark:text-neutral-50" />
                <span className="text-xs text-neutral-900 dark:text-neutral-50">{'sass'}</span>
                <span className="text-xs">
                  {'- 변수, 중첩, 믹스인을 활용하여 까다로운 UI를 구현할 수 있습니다.'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <SiStyledcomponents className="text-neutral-900 dark:text-neutral-50" />
                <span className="text-xs text-neutral-900 dark:text-neutral-50">
                  {'styled-components'}
                </span>
                <span className="text-xs">
                  {'- 필요한 경우 동적 스타일링을 위해 사용합 수 있습니다.'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <TbBrandRedux className="text-neutral-900 dark:text-neutral-50" />
                <span className="text-xs text-neutral-900 dark:text-neutral-50">{'redux'}</span>
                <span className="text-xs">
                  {'- RTK, thunk, saga 등을 활용하여 상태 관리를 할 수 있습니다.'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <SiSvelte className="text-neutral-900 dark:text-neutral-50" />
                <span className="text-xs text-neutral-900 dark:text-neutral-50">{'svelte'}</span>
                <span className="text-xs">
                  {'- svelte-kit 을 사용한 프로젝트 경험이 있습니다.'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <RiNextjsFill className="text-neutral-900 dark:text-neutral-50" />
                <span className="text-xs text-neutral-900 dark:text-neutral-50">{'next.js'}</span>
                <span className="text-xs">
                  {'- SSG, ISR, SSR, CSR 을 최적화하여 사용할 수 있습니다.'}
                </span>
              </div>
              <div className="flex items-center gap-1 ">
                <RiVuejsFill className="text-neutral-900 dark:text-neutral-50" />
                <span className="text-xs text-neutral-900 dark:text-neutral-50">{'vue'}</span>
                <span className="text-xs">{'- vue3 를 활용한 프로젝트 경험이 있습니다.'}</span>
              </div>
              <div className="flex items-center gap-1">
                <SiReactquery className="text-neutral-900 dark:text-neutral-50" />
                <span className="text-xs text-neutral-900 dark:text-neutral-50">
                  {'react-query'}
                </span>
                <span className="text-xs">
                  {'- prefetch, infinite, optimistic 등을 자유롭게 사용할 수 있습니다.'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <IoLogoFirebase className="text-neutral-900 dark:text-neutral-50" />
                <span className="text-xs text-neutral-900 dark:text-neutral-50">{'firebase'}</span>
                <span className="text-xs">
                  {'- firestore, auth, storage, realtime 등을 사용할 수 있습니다.'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <RiSupabaseFill className="text-neutral-900 dark:text-neutral-50" />
                <span className="text-xs text-neutral-900 dark:text-neutral-50">{'supabase'}</span>
                <span className="text-xs">
                  {'- postgres, realtime, auth, storage 등을 사용할 수 있습니다.'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <p className="flex flex-col font-bold">{'> co-working : '}</p>
            <div className="flex flex-row gap-2 text-lg">
              <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                <FaSlack />
                <span className="text-xs">{'slack'}</span>
              </div>
              <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                <GiZeppelin />
                <span className="text-xs">{'zeppelin'}</span>
              </div>
              <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                <SiNotion />
                <span className="text-xs">{'notion'}</span>
              </div>
              <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                <IoLogoFigma />
                <span className="text-xs">{'figma'}</span>
              </div>
              <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                <FaGithub />
                <span className="text-xs">{'github'}</span>
              </div>
              <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                <FaDiscord />
                <span className="text-xs">{'discord'}</span>
              </div>
              <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                <SiJira />
                <span className="text-xs">{'jira'}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <p className="flex flex-col font-bold">{'> others : '}</p>
            <div className="flex flex-row gap-2 text-lg">
              <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                <SiAdobephotoshop />
                <span className="text-xs">{'photoshop'}</span>
              </div>
              <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                <SiAdobeillustrator />
                <span className="text-xs">{'illustrator'}</span>
              </div>
              <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                <SiAdobepremierepro />
                <span className="text-xs">{'premiere'}</span>
              </div>
              <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                <SiBlender />
                <span className="text-xs">{'blender'}</span>
              </div>
              <div className="flex items-center gap-1 text-neutral-900 dark:text-neutral-50">
                <SiOpenai />
                <span className="text-xs">{'openai'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsAndTools;

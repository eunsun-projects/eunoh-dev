'use client';

import { useReadyState } from '@/hooks/ui/useReadyState';
import cn from '@/utils/common/cn';
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
import { IoLogoFigma, IoLogoFirebase, IoLogoVercel } from 'react-icons/io5';
import { RiNextjsFill, RiSupabaseFill, RiTailwindCssFill, RiVuejsFill } from 'react-icons/ri';
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
} from 'react-icons/si';
import { TbBrandRedux } from 'react-icons/tb';
import { useInView } from 'react-intersection-observer';

function SkillsAndTools() {
  const { isMainReady } = useReadyState();
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  return (
    <section
      className={cn(
        'relative flex-col items-center justify-center h-dvh transition-opacity opacity-0 duration-1000 hidden w-full',
        isMainReady && 'flex',
        inView && 'opacity-100',
      )}
      ref={ref}
    >
      <div className="flex flex-col items-center justify-start gap-8 w-[90%] h-[84%] pt-10 xl:pt-0 xl:justify-center">
        <div className="flex justify-center w-full h-[6%]">
          <h2 className="font-bold text-3xl xl:text-5xl">{'🛠️ Skills & Tools 🛠️'}</h2>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 xl:gap-10 w-full h-[80%] xl:px-2 xl:h-[70%]">
          <div className="flex flex-col items-center justify-center gap-3 xl:gap-6 w-full text-4xl xl:text-5xl">
            <p className="flex text-center flex-col pb-4 font-bold text-2xl xl:text-[1.8rem] xl:block xl:pb-0">
              {'> frontend : '}
              <span className="text-xs xl:text-xl">
                다양한 프레임워크와 라이브러리를 다룰 수 있습니다
              </span>
            </p>
            <div className="grid grid-cols-8 gap-3">
              <FaHtml5 />
              <FaCss3Alt />
              <FaJs />
              <SiTypescript />
              <FaReact />
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
            <p className="flex text-center flex-col pb-4 font-bold text-2xl xl:text-[1.8rem] xl:block xl:pb-0">
              {'> co-working : '}
              <span className="text-xs xl:text-xl">슬랙, 피그마, 노션을 사용합니다</span>
            </p>
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
            <p className="flex text-center flex-col font-bold text-2xl xl:text-[1.8rem] xl:block">
              {'> others : '}
              <span className="text-xs xl:text-xl">adobe제품과 LLM에 익숙합니다</span>
            </p>
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

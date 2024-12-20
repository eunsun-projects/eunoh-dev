'use client';

import { useUiState } from '@/hooks/ui/useUiState';
import cn from '@/utils/common/cn';
import { useInView } from 'react-intersection-observer';
import { ReactTyped } from 'react-typed';
import EunOh from '../../../public/eunoh.svg';

function AboutMe() {
  const { mainReady } = useUiState();
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  return (
    <section
      className={cn(
        'relative flex-col items-center justify-center h-dvh transition-opacity opacity-0 duration-1000 hidden w-full',
        mainReady && 'flex',
        inView && 'opacity-100',
      )}
      ref={ref}
    >
      <div className="flex flex-col items-center justify-start gap-4 w-[90%] h-[84%] pt-10 xl:pt-0 xl:justify-center">
        <div className="flex justify-start w-full h-[6%]">
          <h2 className="flex flex-row items-center font-bold text-3xl w-full xl:text-5xl xl:w-[50%]">
            <EunOh className="h-7 w-auto md:h-7 xl:h-7 px-2 overflow-visible" /> About Me{' '}
            <EunOh className="h-7 w-auto md:h-7 xl:h-7 px-2 overflow-visible" />
          </h2>
        </div>
        <div className="flex flex-col justify-start gap-6 w-full h-[80%] xl:gap-2 xl:px-2">
          <div className="flex flex-col items-start justify-center gap-4 h-[calc(100%/3)]">
            <h3 className="font-bold text-2xl xl:text-[1.7rem]">{'> 꾸준히 성장하는 개발자'}</h3>

            <p className="text-base xl:text-lg">
              <ReactTyped
                startWhenVisible
                strings={[
                  '200개 이상의 TIL과 3500개 이상의 커밋, 지속적으로 성장하는 개발자입니다.',
                ]}
                typeSpeed={10}
              />
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-4 h-[calc(100%/3)]">
            <h3 className="font-bold text-2xl xl:text-[1.7rem]">{'> 소통을 중요시하는 개발자'}</h3>
            <p className="text-base xl:text-lg">
              <ReactTyped
                startWhenVisible
                strings={[
                  '3회 이상의 프로젝트 리더 경험, 동기부여를 통해 함께 성장하는 개발자입니다.',
                ]}
                typeSpeed={10}
              />
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-4 h-[calc(100%/3)]">
            <h3 className="font-bold text-2xl xl:text-[1.7rem]">{'> 사용자를 생각하는 개발자'}</h3>
            <p className="text-base xl:text-lg">
              <ReactTyped
                startWhenVisible
                strings={[
                  '102개의 피드백 반영 경험, 더욱 편리하고 매력적인 인터페이스를 제공하기 위해 노력하고 있습니다.',
                ]}
                typeSpeed={10}
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;

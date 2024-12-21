'use client';

import { useReadyState } from '@/hooks/ui/useUiState';
import { ReactTyped } from 'react-typed';
import DarkLightModeButton from './ui/DarkLightModeButton';
import Links from './ui/Links';
import Nav from './ui/Nav';

function Hello() {
  const { mainReady, setMainReady } = useReadyState();

  return (
    <section className="flex flex-col">
      <div className="flex flex-col gap-9">
        <div className="flex flex-row gap-2 items-center justify-between">
          <h1 className="font-bold text-neutral-900 dark:text-neutral-50">
            <ReactTyped strings={['오은: FE engineer']} typeSpeed={10} />
          </h1>
          <DarkLightModeButton ready={mainReady} />
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p>
            <ReactTyped
              strings={['사용자의 경험을 세심하게 다듬고, 탐구와 기록을 이어가며 성장합니다.']}
              typeSpeed={10}
            />
          </p>
          <p>
            <ReactTyped
              strings={[
                '팀의 동기부여를 이끌며 협업 속에서 더 큰 성과를 만들어가는 데 열정을 가지고 있습니다.',
              ]}
              typeSpeed={9}
              onComplete={() => setMainReady(true)}
            />
          </p>
          <p>
            <ReactTyped
              strings={['정말 해결해야 하는 것이 무엇인지 항상 고민합니다.']}
              typeSpeed={10}
            />
          </p>
        </div>
        <Links ready={mainReady} />
        <Nav ready={mainReady} />
      </div>
    </section>
  );
}

export default Hello;

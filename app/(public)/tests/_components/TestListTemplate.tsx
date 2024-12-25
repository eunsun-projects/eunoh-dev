'use client';

import { DarkLightModeButton } from '../../_components/ui';

function TestListTemplate() {
  return (
    <section>
      <div className="w-full flex flex-col justify-start gap-8">
        <div className="flex justify-between w-full">
          <h2 className="font-bold text-neutral-900 dark:text-neutral-50 text-lg m-0">
            {'🧪 Tests 🧪'}
          </h2>
          <DarkLightModeButton />
        </div>
        <div className="flex flex-col gap-3 w-full"></div>
      </div>
    </section>
  );
}

export default TestListTemplate;

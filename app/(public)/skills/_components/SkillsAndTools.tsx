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
          <div className="flex flex-col gap-3 w-full">
            <p className="flex flex-col pb-2 font-bold">{'> frontend : '}</p>
            <div className="flex flex-col gap-2 text-lg">
              <div className="flex items-center">
                <FaHtml5 />
                <span className="text-xs">{': html'}</span>
              </div>
              <div className="flex items-center">
                <FaCss3Alt />
                <span className="text-xs">{': css'}</span>
              </div>
              <div className="flex items-center">
                <FaJs />
                <span className="text-xs">{': js'}</span>
              </div>
              <div className="flex items-center">
                <SiTypescript />
                <span className="text-xs">{': ts'}</span>
              </div>
              <div className="flex items-center">
                <FaReact />
                <span className="text-xs">{': react'}</span>
              </div>
              <div className="flex items-center">
                <RiTailwindCssFill />
                <span className="text-xs">{': tailwind'}</span>
              </div>
              <div className="flex items-center">
                <FaSass />
                <span className="text-xs">{': sass'}</span>
              </div>
              <div className="flex items-center">
                <SiStyledcomponents />
                <span className="text-xs">{': styled-components'}</span>
              </div>
              <div className="flex items-center">
                <TbBrandRedux />
                <span className="text-xs">{': redux'}</span>
              </div>
              <div className="flex items-center">
                <SiSvelte />
                <span className="text-xs">{': svelte'}</span>
              </div>
              <div className="flex items-center">
                <RiNextjsFill />
                <span className="text-xs">{': next.js'}</span>
              </div>
              <div className="flex items-center">
                <RiVuejsFill />
                <span className="text-xs">{': vue'}</span>
              </div>
              <div className="flex items-center">
                <SiReactquery />
                <span className="text-xs">{': react-query'}</span>
              </div>
              <div className="flex items-center">
                <IoLogoFirebase />
                <span className="text-xs">{': firebase'}</span>
              </div>
              <div className="flex items-center">
                <RiSupabaseFill />
                <span className="text-xs">{': supabase'}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <p className="flex flex-col pb-2 font-bold">{'> co-working : '}</p>
            <div className="flex flex-col gap-2 text-lg">
              <FaSlack />
              <GiZeppelin />
              <SiNotion />
              <IoLogoFigma />
              <FaGithub />
              <FaDiscord />
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <p className="flex flex-col pb-2 font-bold">{'> others : '}</p>
            <div className="flex flex-col gap-2 text-lg">
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

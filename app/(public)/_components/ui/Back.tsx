"use client";

import cn from "@/utils/common/cn";
import { useRouter } from "next/navigation";
import { RiArrowGoBackFill } from "react-icons/ri";
import DarkLightModeButton from "./DarkLightModeButton";

interface BackProps {
  className?: string;
  isDarkLightModeButton?: boolean;
}

function Back({ className, isDarkLightModeButton }: BackProps) {
  const router = useRouter();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <RiArrowGoBackFill
        className="text-lg cursor-pointer"
        onClick={() => router.back()}
      />
      {isDarkLightModeButton && <DarkLightModeButton />}
    </div>
  );
}

export default Back;

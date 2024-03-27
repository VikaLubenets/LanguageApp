"use client"

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";
import Image from "next/image";

type Props = {
  id: number;
  title: string;
  imageSrc: string;
  percentage: number;
  disabled?: boolean;
  active?: boolean;
}

export const Card = ({
  id,
  title,
  imageSrc,
  disabled,
  active,
  percentage
}: Props) => {

  return (
    <div 
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px]",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      <div className="min-[24px] w-full flex items-center justify-between">
      </div>
      <Image 
        src={imageSrc} 
        alt={title} 
        height={70} 
        width={93.33}
        className="rounded-lg drop-shadow-md border object-cover mt-5"
      />
      <p className="text-neutral-700 text-center font-bold m-3">
        {title}
      </p>
      {active && (
        <div className="min-[24px] w-full flex items-center flex-col">
          <Progress value={percentage}  />
          <p className="text-neutral-700 text-center font-bold m-3 lg:text-base text-sm">
            {percentage} %
          </p>
        </div>
        )}
    </div>
  )
};
"use client"

import Link from "next/link";
import Image from "next/image"
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

type Props = {
  label: string;
  iconSrc: string;
  href: string;
}

export const SidebarItem = ({
  label, 
  iconSrc, 
  href
}: Props) => {
  const pathname = usePathname();
  const active = pathname === href;


  return (
    <Button 
    variant={active ? "sidebarOutline" : "sidebar"}
    className="justify-start h-[52px]"
    >
      <Link href={href} className="flex items-center justify-center">
        <Image 
        src={iconSrc} 
        alt={"image"} 
        className="mr-5" 
        height={32}
        width={32}
        />
        {label}
      </Link>
    </Button>
  )
}
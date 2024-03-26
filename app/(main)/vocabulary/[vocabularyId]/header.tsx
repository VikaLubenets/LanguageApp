"use client"
import { useExitVocabularyModal } from "@/store/use-vocabulary-modal";
import { X } from "lucide-react";

type Props = {
  title: string;
}

export const Header = ({title}: Props) => {
  const { open } = useExitVocabularyModal();

  return (
    <div className="flex items-center justify-between w-full">
      <X
        onClick={open}
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />
      <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
        {title}
      </h1>
      <div className="w-8"></div>
    </div>
  );
}
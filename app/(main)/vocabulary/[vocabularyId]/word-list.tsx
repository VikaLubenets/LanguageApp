import { Button } from "@/components/ui/button";
import { words } from "@/db/schema";
import Link from "next/link";

type Props = {
  words: typeof words.$inferSelect[];
  id: number;
}

export const VocabularyList = ({words, id}: Props) => {
  return (
    <div className="w-full m-5 flex flex-col gap-10 items-center justify-center">
      <div className="flex items-center justify-between lg:min-w-[650px] min-w-[350px]">
        <h2 className="lg:text-lg text-base font-bold text-slate-500">
          Cards
        </h2>
        <Link href={`/vocabulary/${id}/learn`}>
          <Button variant={"primary"}>
            Learn this module
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        {words.map(word => {
          return (
            <div className="flex lg:flex-row flex-col border-2 border-x-4 active:border-x-2 bg-slate-200 items-center hover:cursor-pointer min-w-[350px] lg:min-w-[650px] p-5 justify-between gap-6">
                <div className="flex justify-between">
                  <div className="lg:text-base text-sm font-bold text-slate-500">
                    {word.word}
                  </div>
                </div>
                <div className="lg:text-base text-sm font-bold text-slate-900">
                  {word.translationEng}
                </div>
            </div>
          )
        })
        }
      </div>
    </div>
  )
}
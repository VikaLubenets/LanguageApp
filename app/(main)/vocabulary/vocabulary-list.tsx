import { vocabularyLists, words } from "@/db/schema";
import Link from "next/link";
import { Card } from "./card";

type VocabularyProgress = { vocabularyListId: number; percentage: number }[] | null;

type Props = {
  vocabularyLists: typeof vocabularyLists.$inferSelect[];
  vocabularyProgress: VocabularyProgress;
}

export const VocabularyList = ({
  vocabularyLists,
  vocabularyProgress
}: Props) => {

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-left font-bold text-neutral-800 text-base my-6">
        Choose the vocabulary list for learning:
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
        {vocabularyLists.map(vocabularyList => {
          const progress = vocabularyProgress?.find(progress => progress.vocabularyListId === vocabularyList.id);
          const percentage = progress ? progress.percentage : 0;
          const active = progress ? true : false;

          return (
            <Link href={`/vocabulary/${vocabularyList.id}`} key={vocabularyList.id}>
              <Card 
                id={vocabularyList.id}
                title={vocabularyList.title}
                imageSrc={vocabularyList.imageSrc}
                disabled={false}
                active={active}
                percentage={percentage}
              />
            </Link>
          );
        })}
      </div> 
    </div>
  )
}
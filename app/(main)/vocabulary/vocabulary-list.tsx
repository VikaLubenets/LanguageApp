import { getVocabularyListById } from "@/db/queries";
import { vocabularyLists, words } from "@/db/schema";
import Link from "next/link";
import { Card } from "./card";

type Props = {
  vocabularyLists: typeof vocabularyLists.$inferSelect[];
}

export const VocabularyList = ({
  vocabularyLists
}: Props) => {
  
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-left font-bold text-neutral-800 text-base my-6">
        Choose the vocabulary list for learning:
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
        {vocabularyLists.map(vocabularyList => {
          return (
            <Link href={`/vocabulary/${vocabularyList.id}`}>
              <Card 
                key={vocabularyList.id}
                id={vocabularyList.id}
                title={vocabularyList.title}
                imageSrc={vocabularyList.imageSrc}
                disabled={false}
            />
            </Link>
          );
        })}
    </div> 
    </div>
  )
}
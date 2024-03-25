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
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
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
  )
}
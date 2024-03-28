import { getVocabularyListById } from "@/db/queries";
import { redirect } from "next/navigation";
import { Header } from "../header";
import { VocabularyList } from "./word-list";


type Props = {
  params: {
    vocabularyId: number;
  }
}

const VocabularyIdPage = async ({ params }: Props) => {
  const vocabularyListData = getVocabularyListById(params.vocabularyId);

  const [vocabularyList] = await Promise.all([
    vocabularyListData
  ])

  if (!vocabularyList || vocabularyList.words.length <= 0) {
    redirect('/vocabulary')
  }

  return (
    <div className="flex flex-col gap-[18px] px-6 items-center">
      <Header title="Words training" />
      <VocabularyList words={vocabularyList.words} id={vocabularyList.id}/>
    </div>
  )
}

export default VocabularyIdPage;
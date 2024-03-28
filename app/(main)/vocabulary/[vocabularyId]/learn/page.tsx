import { getVocabularyListById } from "@/db/queries";
import { redirect } from "next/navigation";
import { WordSlider } from "./word-slider"

type Props = {
  params: {
    vocabularyId: number;
  }
}

const Learn = async ({params}: Props) => {

  const vocabularyListData = getVocabularyListById(params.vocabularyId);

  const [vocabularyList] = await Promise.all([
    vocabularyListData
  ])

  if (!vocabularyList || vocabularyList.words.length <= 0) {
    redirect('/vocabulary')
  }

  return (
    <WordSlider words={vocabularyList.words} />
  )
}

export default Learn;
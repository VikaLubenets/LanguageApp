import { getVocabularyListById } from "@/db/queries";
import { redirect } from "next/navigation";
import { WordSlider } from "./word-slider";


type Props = {
  params: {
    vocabularyId: number;
  }
}

const VocabularyIdPage = async ({params}: Props) => {
  const vocabularyListData = getVocabularyListById(params.vocabularyId);

  const [vocabularyList] = await Promise.all([
    vocabularyListData
  ])

  if(!vocabularyList || vocabularyList.words.length <= 0){
    redirect('/vocabulary')
  }

  return(
    <div className="flex flex-col gap-[18px] px-6 items-center">
      <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
        Words training
      </h1>
      <WordSlider words={vocabularyList.words}/>
    </div>
  )
}

export default VocabularyIdPage;
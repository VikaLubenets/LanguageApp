import { getVocabularyListById } from "@/db/queries";
import { useExitModal } from "@/store/use-exit-modal";
import { X } from "lucide-react";
import { redirect } from "next/navigation";
import { Header } from "./header";
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
      <Header title="Words training" />
      <WordSlider words={vocabularyList.words}/>
    </div>
  )
}

export default VocabularyIdPage;
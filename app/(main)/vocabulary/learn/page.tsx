import { getAllLearningdWords } from "@/db/queries";
import { Header } from "../header";
import { redirect } from "next/navigation";
import { WordSlider } from "../[vocabularyId]/learn/word-slider";

const WordsRepeate = async () => {
  const wordsData = getAllLearningdWords();

  const [words] = await Promise.all([
    wordsData
  ])

  if (!words || words.length <= 0) {
    redirect('/vocabulary')
  }

  return (
    <div className="flex flex-col gap-[18px] px-6 items-center">
      <Header title="Repeate learned words" />
      <WordSlider words={words} />
    </div>
  );
};

export default WordsRepeate;
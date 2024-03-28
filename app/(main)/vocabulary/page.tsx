import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { 
  getVocabularyLists, 
  getVocabularyProgressPercentage, 
  getTotalUserLearnedWordsCount, 
  getTotalUserLearningWordsCount, 
} from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { VocabularyDashboard } from "./dashboard";
import { VocabularyList } from "./vocabulary-list";
import { VocabularyButtons } from "./voсabulary-buttons";

const VocabularyPage = async () => {
  const vocabularyListsData = getVocabularyLists();
  const vocabularyProgressData = getVocabularyProgressPercentage();
  const userLearnedWordsData = getTotalUserLearnedWordsCount();
  const userLearningWordsData = getTotalUserLearningWordsCount();

  const [
    vocabularyLists,
    vocabularyProgress,
    totalCountLearnedWords,
    totalCountLearningWords,
  ] = await Promise.all([
    vocabularyListsData,
    vocabularyProgressData,
    userLearnedWordsData,
    userLearningWordsData
  ])

  if (!vocabularyLists) {
    redirect("/learn");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <VocabularyDashboard totalLearnedCount={totalCountLearnedWords} totalLearningCount={totalCountLearningWords} />
      </StickyWrapper>
      <FeedWrapper>
      <div className="w-full flex flex-row items-center p-5 gap-[15px]">
        <Image 
          src={"/vocabulary.svg"} 
          alt={"vocabulary"} 
          height={90}
          width={90}
        />
        <h2 className="text-center font-bold text-neutral-800 text-2xl my-6">
          Vocabulary
        </h2>
      </div>
      <p className="text-muted-foreground text-lg mb-6">
        Expand your vocabulary with these amazing trainings!
      </p>
      <VocabularyButtons />
      <VocabularyList 
        vocabularyLists={vocabularyLists}
        vocabularyProgress={vocabularyProgress}
      />
      </FeedWrapper>
    </div>
  );
};

export default VocabularyPage;
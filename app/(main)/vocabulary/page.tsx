import { getVocabularyLists } from "@/db/queries";
import Image from "next/image";
import { VocabularyDashboard } from "./dashboard";
import { VocabularyList } from "./vocabulary-list";

const VocabularyPage = async () => {
  const vocabularyListsData = getVocabularyLists();

  const [vocabularyLists] = await Promise.all([
    vocabularyListsData,
  ])

  return (
    <div className="flex flex-col gap-[18px] px-6">
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
      {/* <VocabularyDashboard /> */}
      <VocabularyList vocabularyLists={vocabularyLists}/>
    </div>
  );
};

export default VocabularyPage;
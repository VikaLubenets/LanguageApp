"use client"

import { upserVocabularyProgressUpdate, upserVocabularyProgressCompleted, upserVocabularyProgressUndo } from "@/actions/vocabulary-progress";
import { words } from "@/db/schema"
import { Check, Undo2, X } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { HeaderSlider } from "./header-slider";
import { WordCard } from "./word-card";
import { WordResult } from "./word-result";

type Props = {
  words: typeof words.$inferSelect[];
}
type State = typeof words.$inferSelect[];

export const WordSlider = ({
  words,
}: Props) => {

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [learnedWords, setLearnedWords] = useState<State>([]);
  const [learningWords, setLearningWords] = useState<State>([]);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleNextCard = () => {
    if (currentCardIndex === words.length - 1) {
      setShowFinalScreen(true);
    } else {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    }
  };;

  const handleUndo = async () => {
    startTransition(() => {
      const nextIndex = currentCardIndex === 0 ? 0 : currentCardIndex - 1;
      const currentWord = words[nextIndex];
      upserVocabularyProgressUndo(currentWord.id)
        .catch(() => toast.error("Something went wrong. Please try again"))
        .finally(() => {
          setLearningWords(prevLearningWords => prevLearningWords.filter(word => word.id !== currentWord.id));
          setLearnedWords(prevLearnedWords => prevLearnedWords.filter(word => word.id !== currentWord.id));
          setCurrentCardIndex(nextIndex);
        });
    });
  };

  const handleLearned = async () => {
    startTransition(() => {
      const currentWord = words[currentCardIndex];
      upserVocabularyProgressCompleted(currentWord.id)
        .then(() => {
          setLearnedWords(prevLearnedWords => [...prevLearnedWords, currentWord]);
          handleNextCard();
        })
        .catch(() => toast.error("Something went wrong. Please try again"));
    });
  };
  
  const handleLearning = async () => {
    startTransition(() => {
      const currentWord = words[currentCardIndex];
      upserVocabularyProgressUpdate(currentWord.id)
        .then(() => {
          setLearningWords(prevLearningWords => [...prevLearningWords, currentWord]);
          handleNextCard();
        })
        .catch(() => toast.error("Something went wrong. Please try again"));
    });
  };

  if (showFinalScreen) {
    return (
      <WordResult 
        learnedWordsCount={learnedWords.length}
        learningWordsCount={learningWords.length} 
        vocabularyId={words[currentCardIndex].vocabularyId}      
        />
    );
  }

  return (
    <>
      <div className="w-full max-w-[1140px] pr-6 flex flex-col gap-6 items-center justify-center">
        <HeaderSlider 
          learningWordsCount={learningWords.length} 
          learnedWordsCount={learnedWords.length} 
          wordsTotalCount={words.length} 
        />
        <WordCard
          key={currentCardIndex}
          word={words[currentCardIndex].word}
          translationEng={words[currentCardIndex].translationEng}
          translationRus={words[currentCardIndex].translationRus}
          imageSrc={words[currentCardIndex].imageSrc || ''}
          audioSrc={words[currentCardIndex].audioSrc || ''} 
          />
      </div>
      <div className="flex items-center justify-between w-full">
        {currentCardIndex > 0 && (
          <Undo2
            onClick={handleUndo}
            className="text-slate-500 hover:opacity-75 transition cursor-pointer"
          />
        )}
        <div className="flex items-center justify-center gap-10 flex-grow">
          <X 
            onClick={handleLearning}
            className="text-rose-500 hover:opacity-75 transition cursor-pointer"
          />
          <Check 
            onClick={handleLearned}
            className="text-green-500 hover:opacity-75 transition cursor-pointer"
          />
        </div>
      </div>
    </>
  )
}
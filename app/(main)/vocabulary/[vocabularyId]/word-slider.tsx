"use client"

import { words } from "@/db/schema"
import { Check, Undo2, X } from "lucide-react";
import { useState } from "react";
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

  const handleNextCard = () => {
    if (currentCardIndex === words.length - 1) {
      setShowFinalScreen(true);
    } else {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    }
  };;

  const handleUndo = () => {
    const currentWord = words[currentCardIndex - 1];
    setLearningWords(learningWords.filter(word => word !== currentWord));
    setLearnedWords(learnedWords.filter(word => word !== currentWord));
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? 0 : prevIndex - 1
    );
  };

  const handleLearned = () => {
    const currentWord = words[currentCardIndex];
    setLearnedWords([...learnedWords, currentWord]);
    setLearningWords(learningWords.filter(word => word !== currentWord));
    handleNextCard();
  };

  const handleLearning = () => {
    const currentWord = words[currentCardIndex];
    setLearningWords([...learningWords, currentWord]);
    handleNextCard();
  };

  if (showFinalScreen) {
    return (
      <WordResult 
        learnedWordsCount={learningWords.length} 
        learningWordsCount={learnedWords.length} 
      />
    );
  }


  return (
    <>
      <div className="w-full max-w-[1140px] pr-6 flex flex-col gap-6 items-center justify-center">
        <div className="flex items-center justify-between gap-5 w-full text-sm lg:text-base">
          <div className="flex gap-2 h-[20px] text-rose-500 font-bold">
            <h3>Still learning</h3>
            <div>
              {learningWords.length || 0}
            </div>
          </div>
          <div className="flex gap-2 h-[20px] text-green-500 font-bold">
            <h3>Learned</h3>
            <div>
              {learnedWords.length || 0}
            </div>
          </div>
        </div>
        <WordCard
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
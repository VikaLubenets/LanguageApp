"use client"

import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

type Props = {
  learnedWordsCount: number;
  learningWordsCount: number;
  vocabularyId: number;
}

export const WordResult = ({
  learnedWordsCount,
  learningWordsCount,
  vocabularyId
}: Props) => {
  const { width, height } = useWindowSize();

  return (
    <>
      <Confetti 
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        tweenDuration={10000}
      />
      <div className="flex flex-col items-center justify-center">
        <h2>Final Screen</h2>
        <p>Learned Words: {learnedWordsCount}</p>
        <p>Learning Words: {learningWordsCount}</p>
      </div>
    </>
  )
}
type Props = {
  learnedWordsCount: number;
  learningWordsCount: number;
}

export const WordResult = ({
  learnedWordsCount,
  learningWordsCount
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
    <h2>Final Screen</h2>
    <p>Learned Words: {learnedWordsCount}</p>
    <p>Learning Words: {learningWordsCount}</p>
  </div>
  )
}
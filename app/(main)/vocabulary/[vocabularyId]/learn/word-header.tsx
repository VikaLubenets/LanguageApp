type Props = {
  learningWordsCount: number;
  learnedWordsCount: number;
  wordsTotalCount: number;
}

export const WordHeader = ({
  learningWordsCount,
  learnedWordsCount,
  wordsTotalCount,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-5 w-full text-sm lg:text-base">
    <div className="flex gap-2 h-[20px] text-rose-500 font-bold">
      <h3>Still learning</h3>
      <div>
        {learningWordsCount || 0}
      </div>
    </div>
    <div className="flex gap-2 h-[20px] text-slate-500 font-bold">
        {`${learningWordsCount + learnedWordsCount + 1} / ${wordsTotalCount}`}
    </div>
    <div className="flex gap-2 h-[20px] text-green-500 font-bold">
      <h3>Learned</h3>
      <div>
        {learnedWordsCount || 0}
      </div>
    </div>
  </div>
  )
}
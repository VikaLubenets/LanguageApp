"use client"

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type Props = {
  totalLearnedCount: number | null;
  totalLearningCount: number | null;
}

export const VocabularyDashboard = ({
  totalLearnedCount,
  totalLearningCount,
}: Props) => {
  const learnedWords = totalLearnedCount !== null ? totalLearnedCount : 0;
  const learningWords = totalLearningCount !== null ? totalLearningCount : 0;

  const totalWords = learnedWords + learningWords;
  const learnedWordsPercentage = totalWords !== 0 ? (learnedWords / totalWords) * 100 : 0;
  const learningWordsPercentage = totalWords !== 0 ? (learningWords / totalWords) * 100 : 0;

  return (
    <div className='flex flex-col gap-8'>
      <h2 className='text-center font-bold text-neutral-800 text-xl mt-6 p-6'>
        Dashboard
      </h2>
      <div>
        <div className='text-center font-bold text-neutral-800 text-base pb-3'>
          Total words {totalWords}
        </div>
        <div className='text-base w-full h-[200px] flex'>
          <div className='flex flex-col justify-center items-center gap-4'>
            <h4 className='text-[#FF6A00] text-lg font-bold'>Still learning:</h4>
            <CircularProgressbar 
              value={learningWordsPercentage} 
              text={`${learningWords} words`} 
              styles={{
                path: {
                  stroke: "#FF6A00",
                },
                trail: {
                  stroke: "#e5e7eb",
                },
                text: {
                  fontSize: '12px',
                  fill: '#FF6A00',
                  fontWeight: 'bold',
                }
              }}
            />
          </div>
          <div className='flex flex-col justify-between items-center gap-4'>
            <h4 className='text-[#3E9C2A] text-lg font-bold'>Learned:</h4>
            <CircularProgressbar 
              value={learnedWordsPercentage} 
              text={`${learnedWords} words`} 
              styles={{
                path: {
                  stroke: "#3E9C2A",
                },
                trail: {
                  stroke: "#e5e7eb",
                },
                text: {
                  fontSize: '12px',
                  fill: '#3E9C2A',
                  fontWeight: 'bold',
                }
              }}
            />
          </div>
          </div>
      </div>
    </div>
  );
};
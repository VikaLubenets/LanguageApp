"use client"

import Image from "next/image";
import { useState } from "react";
import { useAudio } from "react-use";

type Props = {
  word: string;
  translationEng: string;
  translationRus: string;
  imageSrc?: string;
  audioSrc?: string;
}

export const WordCard = ({
  word,
  translationEng,
  translationRus,
  imageSrc,
  audioSrc,
}: Props) => {
  const [audio, _, controls] = useAudio({ src: audioSrc || "" });
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped((prevFlipped) => !prevFlipped);
  };

  return (
    <div
      className={`relative border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 shadow-md w-64 h-80 p-4 transition-transform transform-gpu ${
        flipped ? "-rotate-y-180" : ""
      }`}
      onClick={handleFlip}
    >
      {flipped ? (
        <div className="absolute inset-0 flex justify-center items-center transition-opacity bg-white">
          <div className="flex flex-col items-center">
            <p className="font-bold text-xl text-green-500">{translationEng}</p>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex justify-center items-center transition-opacity bg-white">
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-xl">{word}</h3>
            {imageSrc && (
              <div className="mt-4">
                <Image src={imageSrc} alt={word} width={90} height={90} />
              </div>
            )}
            {audioSrc && (
              <div className="mt-4">
                {audio}
                <button className="bg-white text-blue-500 px-2 py-1 rounded" onClick={() => controls.play()}>Play audio</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
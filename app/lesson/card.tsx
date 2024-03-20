import { challenges } from "@/db/schema";

type Props = {
  id: number;
  text: string;
  imageSrc: string | null;
  shortcut: string;
  selected: boolean;
  onClick: () => void;
  status?: 'correct' | 'wrong' | 'none'
  audioSrc: string | null;
  disabled?: boolean;
  type: typeof challenges.$inferSelect["type"];
}

export const Card = ({
  id,
  text,
  imageSrc,
  shortcut,
  selected,
  onClick,
  status,
  audioSrc,
  disabled,
  type,
}: Props) => {
  return (
    <div>
      card
    </div>
  )
}
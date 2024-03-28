import { Button } from "@/components/ui/button";
import Link from "next/link";

export const VocabularyButtons = () => {
  return (
    <div className="flex gap-5">
      <Link href={""} >
        <Button variant={'secondary'}>
          Continue learning
        </Button>
      </Link>
      <Link href={`/vocabulary/repeate`} >
        <Button variant={'primary'}>
          Repeate
        </Button>
      </Link>
      <Link href={`/vocabulary/learn`} >
        <Button variant={'primary'}>
          Learn all
        </Button>
      </Link>
    </div>
  )
}
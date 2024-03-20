"use client"
import { 
  Dialog, 
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useExitModal } from "@/store/use-exit-modal";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const ExitModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useExitModal();

  useEffect(() => setIsClient(true), []);

  if(!isClient){
    return null
  }

  return(
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center w-full justify-center mb-5">
              <Image 
                src="/coffee_sad.svg" 
                alt="coffee"
                height={80}
                width={80}
                />
            </div>
            <DialogTitle className="text-center font-bold">
              Wait, don&apos;t go!
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              You&apos;re about to leave the lesson. Are you sure?
            </DialogDescription>
            <DialogFooter className="mb-4">
              <div className="flex flex-col gap-y-4 w-full">
                <Button 
                  variant="primary"
                  className="w-full"
                  size="lg"
                  onClick={close}
                  >
                  Keep learning
                </Button>
                <Button 
                  variant="dangerOutline"
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    close();
                    router.push("/learn")
                  }}
                  >
                  End session
                </Button>
              </div>

            </DialogFooter>
          </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}
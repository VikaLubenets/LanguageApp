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
import { useHeartsModal } from "@/store/use-hearts-modal"
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const HeartsModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useHeartsModal();

  const onClick = () => {
    close();
    router.push('/store');
  }

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
              Youn&apos;re ran out of hearts!
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              Get Pro for unlimited hearts, or purchase them in the store.
            </DialogDescription>
            <DialogFooter className="mb-4">
              <div className="flex flex-col gap-y-4 w-full">
                <Button 
                  variant="primary"
                  className="w-full"
                  size="lg"
                  onClick={onClick}
                  >
                  Get unlimited hearts
                </Button>
                <Button 
                  variant="primaryOutline"
                  className="w-full"
                  size="lg"
                  onClick={close}
                  >
                  No thanks
                </Button>
              </div>

            </DialogFooter>
          </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}
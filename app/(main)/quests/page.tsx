import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Promo } from "@/components/promo";
import { quests } from "@/lib/constants";

const QuestsPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [
    userProgress,
    userSubscription,
  ] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ])

  if(!userProgress || !userProgress.activeCourse){
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return(
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress 
          activeCourse={userProgress.activeCourse} 
          hearts={userProgress.hearts} 
          points={userProgress.points} 
          hasActiveSubscription={!!userSubscription?.isActive} 
        />
       {!isPro && (
          <Promo />
        )}
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image 
            src={"/quests.svg"} 
            alt={"quests"} 
            height={90}
            width={90}
          />
          <h2 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Quests
          </h2>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Complete quests by earning points.
          </p>
          <ul className="w-full">
            {quests.map((quest) => {
              const progress = (userProgress.points / quest.value) * 100;

              return (
                <div
                  key={quest.title}
                  className='flex items-center w-full p-4 border-t-2'
                >
                  <Image 
                    src={"/points.svg"} 
                    alt={"Points"} 
                    height={60}
                    width={60}
                  />
                  <div className="flex flex-col gap-y-2 w-full">
                    <p className="text-neutral-700 text-xl font-bold">
                      {quest.title}
                    </p>
                    <Progress value={progress} className="h-3" />
                  </div>
                </div>
              )
            })}
          </ul>


        </div>
      </FeedWrapper>
    </div>
  )
}

export default QuestsPage;
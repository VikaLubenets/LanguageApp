import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import Image from "next/image";
import Items from "./items";
import { Promo } from "@/components/promo";

const ShopPage = async () => {
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
            src={"/shop.svg"} 
            alt={"shop"} 
            height={90}
            width={90}
          />
          <h2 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Shop
          </h2>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Spend your points on cool staff.
          </p>
          <Items 
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={!!userSubscription?.isActive}
          />
        </div>
      </FeedWrapper>
    </div>
  )
}

export default ShopPage;
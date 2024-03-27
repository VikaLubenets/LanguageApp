"use server"

import db from "@/db/drizzle";
import { eq, and } from "drizzle-orm";
import { getCourseById, getCourseProgress, getUserProgress, getUserSubscription } from "@/db/queries";
import { auth, currentUser } from "@clerk/nextjs"
import { challengeProgress, challenges, userProgress } from "@/db/schema"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { HEARTS_MAXIMUM, HEARTS_MINIMUM, POINTS_TO_REFIL } from "@/lib/constants";

export const upserUseProgress = async (courseId: number) => {
  const { userId } = await auth();
  const user = await currentUser();

  if(!userId || !user){
    throw new Error("Unauthorized");
  }

  const course = await getCourseById(courseId);

  if(!course){
    throw new Error('Course not found')
  }

  if(!course.units.length || !course.units[0].lessons.length){
    throw new Error('Course is empty')
  }

  const existingUserProgress = await getUserProgress();

  if(existingUserProgress){
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/coffee2.svg",
    })
    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/coffee2.svg",
  })

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
}

export const reduceHearts = async (challengeId: number) => {
  const { userId } = await auth();

  if(!userId){
    throw new Error("Unauthorized");
  }

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId)
  })

  if(!challenge){
    throw new Error("Challenge not found")
  }

  const currentUserProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();

  const existingChallengeProgress = await db.query.challengeProgress
    .findFirst({
      where: and(
        eq(challengeProgress.userId, userId),
        eq(challengeProgress.challengeId, challengeId)
      )
    })

    const isPractice = !!existingChallengeProgress;
    const lessonId = challenge.lessonId;

    if(isPractice){
      return {error: "practice"};
    }

    if(!currentUserProgress){
      throw new Error("User progress not found");
    }

    if(userSubscription?.isActive){
      return {error: "subscription"}
    }

    if(currentUserProgress.hearts === 0){
      return {error: "hearts"};
    }

    await db.update(userProgress).set({
      hearts: Math.max(currentUserProgress.hearts - 1, HEARTS_MINIMUM),
    }).where(eq(userProgress.userId, userId));

    revalidatePath("/shop");
    revalidatePath("/learn");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);

}


export const refillHearts = async () => {
  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  if (currentUserProgress.hearts === 5) {
    throw new Error("Hearts are already full");
  }

  if (currentUserProgress.points < POINTS_TO_REFIL) {
    throw new Error("Not enough points");
  }

  await db.update(userProgress).set({
    hearts: HEARTS_MAXIMUM,
    points: currentUserProgress.points - POINTS_TO_REFIL,
  }).where(eq(userProgress.userId, currentUserProgress.userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};
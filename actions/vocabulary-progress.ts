"use server"

import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import {  words, wordsProgress, userProgress } from "@/db/schema";
import { POINTS_FOR_WORD } from "@/lib/constants";
import { auth } from "@clerk/nextjs"
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const upserVocabularyProgress = async (wordId: number, learned: boolean, learning: boolean) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const existingProgress = await db.query.wordsProgress.findFirst({
    where: and(
      eq(wordsProgress.wordId, wordId),
      eq(wordsProgress.userId, userId)
    )
  });

  if (existingProgress) {
    await db.update(wordsProgress).set({
      learned,
      learning,
    }).where(and(
      eq(wordsProgress.wordId, wordId),
      eq(wordsProgress.userId, userId)
    ));
  } else {
    await db.insert(wordsProgress).values({
      wordId,
      userId,
      learned,
      learning,
    });
  }

  const word = await db.query.words.findFirst({
    where: eq(words.id, wordId),
  });
  const vocabularyId = word?.vocabularyId;

  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  const pointsChange = learned ? POINTS_FOR_WORD : -POINTS_FOR_WORD;

  await db.update(userProgress).set({
    points: currentUserProgress.points + pointsChange,
  }).where(eq(userProgress.userId, userId));

  revalidatePath("/vocabulary");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/vocabulary/${vocabularyId}`);
};

export const upserVocabularyProgressUpdate = async (wordId: number) => {
  await upserVocabularyProgress(wordId, false, true);
};

export const upserVocabularyProgressCompleted = async (wordId: number) => {
  await upserVocabularyProgress(wordId, true, false);
};

export const upserVocabularyProgressUndo = async (wordId: number) => {
  await upserVocabularyProgress(wordId, false, true);
};
import { auth } from "@clerk/nextjs";
import { eq, and } from "drizzle-orm";
import { cache } from "react";
import db from "./drizzle";
import { 
  courses, 
  userProgress, 
  units, 
  lessons, 
  challenges, 
  challengeOptions, 
  challengeProgress, 
  userSubscription,
  vocabularyLists,
  words,
  wordsProgress
} from "./schema";

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();

  return data;
})

export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if(!userId) {
    return null
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    }
  })

  return data
})

export const getUnits = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) {
    return [];
  }

  const data = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
            with: {
              challengeProgress: {
                where: eq(
                  challengeProgress.userId,
                  userId,
                ),
              },
            },
          },
        },
      },
    },
  });

  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      if (
        lesson.challenges.length === 0
      ) {
        return { ...lesson, completed: false };
      }

      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return challenge.challengeProgress
          && challenge.challengeProgress.length > 0
          && challenge.challengeProgress.every((progress) => progress.completed);
      });

      return { ...lesson, completed: allCompletedChallenges };
    });

    return { ...unit, lessons: lessonsWithCompletedStatus };
  });

  return normalizedData;
});

export const getCourseById = cache( async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    with: {
      units: {
        orderBy: (units, { asc }) => [asc(units.order)],
        with: {
          lessons: {
            orderBy: (lessons, { asc }) => [asc(lessons.order)],
          }
        }
      }
    }
  })

  return data;
})

export const getCourseProgress = cache( async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if(!userId || !userProgress?.activeCourseId){
    return null
  }

  const unitsInActiveCourse = await db.query.units.findMany({
    orderBy: (units, {asc}) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons:{
        orderBy: (lessons, {asc}) => [asc(lessons.order)],
        with: {
          unit: true,
          challenges: {
            with: {
              challengeProgress:{
                where: eq(challengeProgress.userId, userId),
              }
            }
          }
        }
      }
    }
  })

  const firstUncompletedLesson = unitsInActiveCourse.flatMap(
    (unit) => unit.lessons
  ).find(
    (lesson) => lesson.challenges.some((challenge) => {
      return !challenge.challengeProgress || 
      challenge.challengeProgress.length === 0 || 
      challenge.challengeProgress.some((progress) => progress.completed === false)
    })
  )

  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  }
})

export const getLesson = cache(async (id?: number) => {
  const { userId } = await auth();

  if(!userId){
    return null;
  }

  const courseProgress = await getCourseProgress();

  const lessonID = id || courseProgress?.activeLessonId;

  if(!lessonID){
    return null;
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonID),
    with: {
      challenges: {
        orderBy: (challenges, {asc}) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          }
        }
      }
    }
  });

  if(!data || !data.challenges) {
    return null;
  }

  const normalizedChallenges = data.challenges.map((challenge) => {
    const completed = challenge.challengeProgress && challenge.
    challengeProgress.length > 0 &&
    challenge.challengeProgress.every((progress) => progress.completed)


    return { ...challenge, completed}
  })

  return {...data, challenges: normalizedChallenges }
});

export const getLessonPercentage = cache(async() => {
  const courseProgress = await getCourseProgress();

  if(!courseProgress?.activeLessonId){
    return 0;
  }

  const lesson = await getLesson(courseProgress.activeLessonId);

  if(!lesson){
    return 0;
  }

  const completedChallenges = lesson.challenges
    .filter(challenge => challenge.completed);

  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100
  )

  return percentage;
})

export const getUserSubscription = cache(async() => {
  const DAY_IN_MS = 86_400_000;
  const { userId } = await auth();

  if(!userId) return null;

  const data = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, userId),

  })

  if(!data) return null;

  const isActive = data.stripePriceId &&
    data.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return {
    ...data,
    isActive: !!isActive,
  }
})

export const getTopTenUsers = cache(async () => {
  const { userId } = await auth();

  if(!userId){
    return []
  }


  const data = await db.query.userProgress.findMany({
    orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
    columns: {
      userId: true,
      userName: true,
      userImageSrc: true,
      points: true,
    }
  });

  return data;
});

export const getVocabularyLists = cache(async () => {
  const data = await db.query.vocabularyLists.findMany();

  return data;
});

export const getWords = cache(async () => {
  const data = await db.query.words.findMany();

  return data;
});

export const getVocabularyListById = cache( async (vocabularyId: number) => {
  const data = await db.query.vocabularyLists.findFirst({
    where: eq(vocabularyLists.id, vocabularyId),
    with: {
      words: {
        orderBy: (words, { asc }) => [asc(words.order)],
        }
      }
    })
  
  return data;
  });


export const getVocabularyProgressPercentage = cache(async (vocabularyId?: number) => {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }

  const userWordsProgress = await db.query.wordsProgress.findMany({
    where: and(
      eq(wordsProgress.userId, userId),
      eq(wordsProgress.learned, true),
    )
  });

  if(!userWordsProgress){
    return null
  }

  const userLearnedWordIds = userWordsProgress.map(progress => progress.wordId);

  if(userLearnedWordIds.length === 0){
    return null;
  }

  const userWords = [];

  for(let id of userLearnedWordIds){
    const word = await db.query.words.findFirst({
      where: eq(words.id, id),
    });

    if(word){
      userWords.push(word);
    }
  }

  let userActiveVocabularyListIds = vocabularyId ? [vocabularyId] : [...new Set(userWords.map(word => word.vocabularyId))];

  const result = [];

  for (const vocabularyListId of userActiveVocabularyListIds) {
    const wordsInList = await db.query.words.findMany({
      where: eq(words.vocabularyId, vocabularyListId)
    });

    const totalWordsCount = wordsInList.length;
    
    const learnedWordsCount = userWords.filter(word => word.vocabularyId === vocabularyListId).length;

    const percentage = Math.round((learnedWordsCount / totalWordsCount) * 100);

    result.push({
      vocabularyListId: vocabularyListId,
      percentage: percentage,
    });
  }

  return result;
});

export const getTotalUserLearningWordsCount = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const learningWordsProgress = await db.query.wordsProgress.findMany({
    where: and(
      eq(wordsProgress.userId, userId),
      eq(wordsProgress.learning, true)
    )
  });

  return learningWordsProgress.length;
})

export const getTotalUserLearnedWordsCount = cache(async() => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const learnedWordsProgress = await db.query.wordsProgress.findMany({
    where: and(
      eq(wordsProgress.userId, userId),
      eq(wordsProgress.learned, true)
    )
  });

  return learnedWordsProgress.length;
})

export const getAllLearnedWords = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const allUserWords = await db.query.words.findMany({
    with: {
      wordsProgress: {
        where: and(
          eq(wordsProgress.userId, userId),
        ),
      }
    }
  });

  const learnedWords = allUserWords.filter(word =>
    word.wordsProgress.every(progress => progress.learned)
  );

  return learnedWords;
})

export const getAllLearningdWords = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const allUserWords = await db.query.words.findMany({
    with: {
      wordsProgress: {
        where: and(
          eq(wordsProgress.userId, userId),
        ),
      }
    }
  });

  const learningWords = allUserWords.filter(word =>
    word.wordsProgress.every(progress => progress.learning)
  );
  

  return learningWords;
})
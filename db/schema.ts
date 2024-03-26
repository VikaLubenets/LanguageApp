import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
  units: many(units),
}));

export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(), // Unit 1
  description: text("description").notNull(), // Learn the basics of spanish
  courseId: integer("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
  order: integer("order").notNull(),
});

export const unitsRelations = relations(units, ({ many, one }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  unitId: integer("unit_id").references(() => units.id, { onDelete: "cascade" }).notNull(),
  order: integer("order").notNull(),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  challenges: many(challenges),
}));

export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST"]);

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessons.id, { onDelete: "cascade" }).notNull(),
  type: challengesEnum("type").notNull(),
  question: text("question").notNull(),
  order: integer("order").notNull(),
});

export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId],
    references: [lessons.id],
  }),
  challengeOptions: many(challengeOptions),
  challengeProgress: many(challengeProgress),
}));

export const challengeOptions = pgTable("challenge_options", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: "cascade" }).notNull(),
  text: text("text").notNull(),
  correct: boolean("correct").notNull(),
  imageSrc: text("image_src"),
  audioSrc: text("audio_src"),
});

export const challengeOptionsRelations = relations(challengeOptions, ({ one }) => ({
  challenge: one(challenges, {
    fields: [challengeOptions.challengeId],
    references: [challenges.id],
  }),
}));

export const challengeProgress = pgTable("challenge_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: "cascade" }).notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const challengeProgressRelations = relations(challengeProgress, ({ one }) => ({
  challenge: one(challenges, {
    fields: [challengeProgress.challengeId],
    references: [challenges.id],
  }),
}));

export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  userName: text("user_name").notNull().default("User"),
  userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
  activeCourseId: integer("active_course_id").references(() => courses.id, { onDelete: "cascade" }),
  hearts: integer("hearts").notNull().default(5),
  points: integer("points").notNull().default(0),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}));


export const userSubscription = pgTable("user_subscription", {
  id: serial('id').primaryKey(),
  userId: text("user_id").notNull().unique(),
  stripeCustomerId: text("stripe_customer_id").notNull().unique(),
  stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
  stripePriceId: text("stripe_price_id").notNull(),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end").notNull(),
});

export const vocabularyLists = pgTable("vocabulary_lists", {
  id: serial('id').primaryKey(),
  title: text("title").notNull(),
  level: text("level").notNull(),
  imageSrc: text("image_src").notNull(),
});

export const vocabularyListsRelations = relations(vocabularyLists, ({ many }) => ({
  words: many(words),
}));

export const words = pgTable("words", {
  id: serial("id").primaryKey(),
  vocabularyId: integer("vocabulary_id").references(() => vocabularyLists.id, { onDelete: "cascade" }).notNull(),
  word: text("word").notNull(),
  translationEng: text("translation_eng").notNull(),
  translationRus: text("translation_rus").notNull(),
  order: integer("order").notNull(),
  imageSrc: text("image_src"),
  audioSrc: text("audio_src"),
});

export const wordsRelations = relations(words, ({ one }) => ({
  vocabularyList: one(vocabularyLists, {
    fields: [words.vocabularyId],
    references: [vocabularyLists.id],
  }),
}));
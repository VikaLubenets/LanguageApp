import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try  {
    console.log("Seeding database")

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      {
        id:1,
        title: "A1 nivel",
        imageSrc: "./A1level.svg"
      },
      {
        id:2,
        title: "A2 nivel",
        imageSrc: "./A2level.svg"
      },
      {
        id:3,
        title: "B1 nivel",
        imageSrc: "./B1level.svg"
      },
      {
        id:4,
        title: "B2 nivel",
        imageSrc: "./B1level.svg"
      },
    ])

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Unit 1",
        description: "Learn the basics",
        order: 1,
      }
    ])

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        order: 1,
        title: "Nouns"
      },
      {
        id: 2,
        unitId: 1,
        order: 2,
        title: "Verbs"
      },
      {
        id: 3,
        unitId: 1,
        order: 3,
        title: "Verbs"
      },
      {
        id: 4,
        unitId: 1,
        order: 4,
        title: "Verbs"
      },
      {
        id: 5,
        unitId: 1,
        order: 5,
        title: "Verbs"
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        order: 1,
        question: "Which one of these is the 'man'?"
      },
      {
        id: 2,
        lessonId: 1,
        type: "ASSIST",
        order: 2,
        question: "The man"
      },
      {
        id: 3,
        lessonId: 1,
        type: "SELECT",
        order: 3,
        question: "Which one of these is the 'women'?"
      },
      {
        id: 4,
        lessonId: 2,
        type: "SELECT",
        order: 1,
        question: "Which one of these is the 'man'?"
      },
      {
        id: 5,
        lessonId: 2,
        type: "ASSIST",
        order: 2,
        question: "The man"
      },
      {
        id: 6,
        lessonId: 2,
        type: "SELECT",
        order: 3,
        question: "Which one of these is the 'women'?"
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1,
        imageSrc: "/coffee2.svg",
        correct: true,
        text: "el hombre",
        audioSrc: "/es_hombre.mp3",
      },
      {
        id: 2,
        challengeId: 1,
        imageSrc: "/learn.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_mujer.mp3",
      },
      {
        id: 3,
        challengeId: 1,
        imageSrc: "/hearts.svg",
        correct: false,
        text: "la chica",
        audioSrc: "/es_chica.mp3",
      },
      {
        id: 4,
        challengeId: 2,
        correct: true,
        text: "el hombre",
        audioSrc: "/es_hombre.mp3",
      },
      {
        id: 5,
        challengeId: 2,
        correct: false,
        text: "la mujer",
        audioSrc: "/es_mujer.mp3",
      },
      {
        id: 6,
        challengeId: 2,
        correct: false,
        text: "la chica",
        audioSrc: "/es_chica.mp3",
      },
      {
        id: 7,
        challengeId: 3,
        imageSrc: "/coffee2.svg",
        correct: false,
        text: "el hombre",
        audioSrc: "/es_hombre.mp3",
      },
      {
        id: 8,
        challengeId: 3,
        imageSrc: "/learn.svg",
        correct: true,
        text: "la mujer",
        audioSrc: "/es_mujer.mp3",
      },
      {
        id: 9,
        challengeId: 3,
        imageSrc: "/hearts.svg",
        correct: false,
        text: "la chica",
        audioSrc: "/es_chica.mp3",
      },
      {
        id: 10,
        challengeId: 4,
        imageSrc: "/coffee2.svg",
        correct: true,
        text: "el hombre",
        audioSrc: "/es_hombre.mp3",
      },
      {
        id: 11,
        challengeId: 4,
        imageSrc: "/learn.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_mujer.mp3",
      },
      {
        id: 12,
        challengeId: 4,
        imageSrc: "/hearts.svg",
        correct: false,
        text: "la chica",
        audioSrc: "/es_chica.mp3",
      },
      {
        id: 13,
        challengeId: 5,
        correct: true,
        text: "el hombre",
        audioSrc: "/es_hombre.mp3",
      },
      {
        id: 14,
        challengeId: 5,
        correct: false,
        text: "la mujer",
        audioSrc: "/es_mujer.mp3",
      },
      {
        id: 15,
        challengeId: 5,
        correct: false,
        text: "la chica",
        audioSrc: "/es_chica.mp3",
      },
      {
        id: 16,
        challengeId: 6,
        imageSrc: "/coffee2.svg",
        correct: false,
        text: "el hombre",
        audioSrc: "/es_hombre.mp3",
      },
      {
        id: 17,
        challengeId: 6,
        imageSrc: "/learn.svg",
        correct: true,
        text: "la mujer",
        audioSrc: "/es_mujer.mp3",
      },
      {
        id: 18,
        challengeId: 6,
        imageSrc: "/hearts.svg",
        correct: false,
        text: "la chica",
        audioSrc: "/es_chica.mp3",
      },
    ])



    console.log("Seeding finished");

  } catch (err) {
    console.error(err);
    throw new Error("Failed to seed the database");
  }
}

main();

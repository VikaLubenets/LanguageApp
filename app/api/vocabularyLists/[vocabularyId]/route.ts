import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { vocabularyLists } from "@/db/schema";
import { eq } from "drizzle-orm";

export const GET = async (
  req: Request,
  {params}: {params: {vocabularyId: number}}
) => {

  if(!isAdmin()){
    return new NextResponse("Unauthorized", {status: 401})
  }

  const data = await db.query.vocabularyLists.findFirst({
    where: eq(vocabularyLists.id, params.vocabularyId),
  })

  return NextResponse.json(data);
}


export const PUT = async (
  req: Request,
  {params}: {params: {vocabularyId: number}}
) => {
  
  if(!isAdmin()){
    return new NextResponse("Unauthorized", {status: 401})
  }

  const body = await req.json();

  const data = await db.update(vocabularyLists).set({
    ...body,
  }).where(eq(vocabularyLists.id, params.vocabularyId)).returning();

  return NextResponse.json(data[0]);
}

export const DELETE = async (
  req: Request,
  {params}: {params: {vocabularyId: number}}
) => {

  if(!isAdmin()){
    return new NextResponse("Unauthorized", {status: 401})
  }

  const data = await db.delete(vocabularyLists)
    .where(eq(vocabularyLists.id, params.vocabularyId)).returning();

  return NextResponse.json(data[0]);
}
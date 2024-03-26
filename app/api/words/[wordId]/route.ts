import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { words } from "@/db/schema";
import { eq } from "drizzle-orm";

export const GET = async (
  req: Request,
  {params}: {params: {wordId: number}}
) => {

  if(!isAdmin()){
    return new NextResponse("Unauthorized", {status: 401})
  }

  const data = await db.query.words.findFirst({
    where: eq(words.id, params.wordId),
  })

  return NextResponse.json(data);
}


export const PUT = async (
  req: Request,
  {params}: {params: {wordId: number}}
) => {
  
  if(!isAdmin()){
    return new NextResponse("Unauthorized", {status: 401})
  }

  const body = await req.json();

  const data = await db.update(words).set({
    ...body,
  }).where(eq(words.id, params.wordId)).returning();

  return NextResponse.json(data[0]);
}

export const DELETE = async (
  req: Request,
  {params}: {params: {wordId: number}}
) => {

  if(!isAdmin()){
    return new NextResponse("Unauthorized", {status: 401})
  }

  const data = await db.delete(words)
    .where(eq(words.id, params.wordId)).returning();

  return NextResponse.json(data[0]);
}
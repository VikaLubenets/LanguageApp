import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { vocabularyLists } from "@/db/schema";

export const GET = async () => {
  if(!isAdmin()){
    return new NextResponse("Unauthorized", {status: 401})
  }

  const data = await db.query.vocabularyLists.findMany();

  return NextResponse.json(data);
}


export const POST = async (req: Request) => {
  if(!isAdmin()){
    return new NextResponse("Unauthorized", {status: 401})
  }

  const body = await req.json();

  const data = await db.insert(vocabularyLists).values({
    ...body,
  }).returning();

  return NextResponse.json(data[0]);
}
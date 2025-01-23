/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { sanityClient } from "../../../sanity/lib/client";
import { allBlogsQuery } from "../../../sanity/queries";

export async function GET() {
  try {
    const blogs = await sanityClient.fetch(allBlogsQuery);
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

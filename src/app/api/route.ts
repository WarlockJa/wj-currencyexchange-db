import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";

// adding for cache revalidation
export const revalidate = 1;

export async function GET() {
  try {
    // getting date 31 day in the past to use in DB query
    const date = new Date();
    date.setDate(date.getDate() - 31);
    const dateToFetchFrom = date.toISOString().split("T")[0];

    // fetching data for the last 30 days
    const data = await prisma.data_by_days.findMany({
      where: {
        date: { gte: dateToFetchFrom },
      },
    });

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}

// PATH revalidation

import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// e.g a webhook to `http://localhost:3000/api/revalidate?path=/&secret=<token>`
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const path = request.nextUrl.searchParams.get("path") || "/";

  if (secret !== process.env.SECRET_TOKEN) {
    return NextResponse.json(
      { message: "Invalid secret" },
      {
        status: 401,
        statusText: "Unauthorized",
        headers: { "Content-Type": "Application/json" },
      }
    );
  }

  revalidatePath(path);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

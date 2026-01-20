import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { message: "API route not found" },
    { status: 404 }
  );
}

// Reuse the same logic for other methods
export const POST = GET;
export const PUT = GET;
export const DELETE = GET;
export const PATCH = GET;
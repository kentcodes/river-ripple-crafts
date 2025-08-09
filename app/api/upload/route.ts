import { NextResponse } from "next/server";
// For a real app, create an S3 presigned URL here.
// This starter returns a mock URL so you can wire the client flow.
export async function POST() {
  return NextResponse.json({ url: "/api/upload/mock", key: "uploads/mock-key" });
}

import { readFile } from "fs/promises";
import { NextResponse } from "next/server";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default async function Icon() {
  const image = await readFile(
    process.env.NODE_ENV === "production"
      ? "public/favicon.png"
      : "public/favicon-dev.png",
  );

  return new NextResponse(image, {
    headers: {
      "Content-Type": contentType,
    },
  });
}

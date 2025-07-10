import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Déconnexion réussie" },
    { status: 200 }
  );

  // Supprimer le cookie JWT
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  });

  return response;
}

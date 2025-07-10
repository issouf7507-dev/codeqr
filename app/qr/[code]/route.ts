import { redirect } from "next/navigation";
import prisma from "@/libs/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const qrCode = await prisma.qRCode.findUnique({
    where: { code },
    include: { link: true },
  });

  if (qrCode?.isActivated && qrCode.link?.googleReviewUrl) {
    redirect(qrCode.link.googleReviewUrl);
  }

  // Si non activé, rediriger vers la page d'activation React
  redirect(`/qr/${code}/activation`);
}

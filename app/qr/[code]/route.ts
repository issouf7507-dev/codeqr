import { redirect } from "next/navigation";
import prisma from "@/libs/prisma";

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  const qrCode = await prisma.qRCode.findUnique({
    where: { code: params.code },
    include: { link: true },
  });

  if (qrCode?.isActivated && qrCode.link?.googleReviewUrl) {
    redirect(qrCode.link.googleReviewUrl);
  }

  // Si non activé, rediriger vers la page d'activation React
  redirect(`/qr/${params.code}/activation`);
}

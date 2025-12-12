import prisma from "@/app/lib/prisma";

export const createUser = async ({
  email,
  passwordHash,
  userName,
}: {
  email: string;
  passwordHash: string;
  userName: string;
}) => {
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name: userName,
    },
  });

  return user;
};

export const findUser = async ({ email }: { email: string }) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
};

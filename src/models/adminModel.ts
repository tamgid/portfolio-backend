import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findUserByUsername = async (username: string) => {
  return prisma.users.findFirst({
    where: { username },
  });
};

export const findUserByEmail = async (email: string) => {
  return prisma.users.findFirst({
    where: { email },
  });
};

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  return prisma.users.create({
    data: { username, email, password },
  });
};

export const createAdmin = async (adminData: any, userId: number) => {
  return prisma.admin.create({
    data: {
      ...adminData,
      user_id: userId, // Add userId to link the admin with the logged-in user
    },
  });
};

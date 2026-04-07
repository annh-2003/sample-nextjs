import { prisma } from "./db";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  return prisma.user.create({ data });
}

export async function validateCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.password !== password) return null;
  return user;
}

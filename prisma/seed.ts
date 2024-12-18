import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import UserSchema from '../src/schemas/UserSchema';
import { adminUser } from '../data/adminUser';
import { demoUsers } from '../data/demoUsers';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding admin user...');

  const validatedAdmin = UserSchema.parse(adminUser);

  console.log('Validated admin user:', validatedAdmin);
  console.log('Password:', validatedAdmin.password);

  const hashedPassword = await bcrypt.hash(validatedAdmin.password, 10);
  // hash(validatedAdmin.password, 10);

  const token = jwt.sign(
    {
      email: validatedAdmin.email,
      role: validatedAdmin.role,
    },
    'your-secret-key',
    {
      expiresIn: '8h',
    },
  );

  await prisma.user.upsert({
    where: { email: validatedAdmin.email },
    update: {},
    create: { ...validatedAdmin, password: hashedPassword },
  });

  console.log('Seeding demo users...');

  for (const user of demoUsers) {
    const validatedUser = UserSchema.parse(user);

    const hashedPassword = await bcrypt.hash(validatedUser.password, 10);

    const token = jwt.sign(
      {
        email: validatedUser.email,
        role: validatedUser.role,
      },
      'your-secret-key',
      {
        expiresIn: '8h',
      },
    );

    await prisma.user.upsert({
      where: { email: validatedUser.email },
      update: {},
      create: { ...validatedUser, password: hashedPassword },
    });
  }
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

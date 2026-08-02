import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const adminEmail = 'admin@educoloring.com';
  
  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail }
  });

  if (existingAdmin) {
    console.log(`Admin with email ${adminEmail} already exists!`);
    return;
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);

  // Create the admin
  const admin = await prisma.admin.create({
    data: {
      name: 'Super Admin',
      email: adminEmail,
      password: hashedPassword,
    },
  });

  console.log(`Successfully created admin user: ${admin.email} (Password: admin123)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { prisma } from "../lib/db";
async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: { role: "admin" },
    create: { email: "admin@example.com", role: "admin", name: "Admin" }
  });
  console.log("Seeded admin:", admin.email);
}
main().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)});

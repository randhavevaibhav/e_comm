import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/client";

// 1. Add PrismaClient to the global object type in development
declare global {
  var prisma: PrismaClient | undefined;
}

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });

// 2. Initialize the client
let prisma: PrismaClient;

// In a production environment, we just create a single new instance.
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({ adapter });
} else {
  // In development, Next.js HMR can create new instances on every file save.
  // We use the global object to store and reuse the single existing instance.
  if (!global.prisma) {
    global.prisma = new PrismaClient({ adapter });
  }
  prisma = global.prisma;
}

// 3. Export the single instance
export default prisma;

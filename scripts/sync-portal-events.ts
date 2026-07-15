import { PrismaClient } from "@prisma/client";
import { syncPortalEvents } from "../lib/portal-events";

const prisma = new PrismaClient();

syncPortalEvents(prisma)
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

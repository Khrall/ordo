import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {

    const results = await prisma.itemType.createMany({
        data: [
            { name: 'Skummet melk' },
            { name: 'Olivenolje' },
            { name: 'Eple' },
            { name: 'Havregryn' },
        ]
    })

    console.log(results);
}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });

import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const prisma = new PrismaClient();

export async function metrics(req: FastifyRequest, res: FastifyReply) {
    const usernameParamsSchema = z.object({
        username: z.string()
    });

    const { username } = usernameParamsSchema.parse(req.params);

    const userMeals = await prisma.user.findUnique({
        where: {
            name: username
        },
        select: {
            meals: true
        }
    });

    const totalMeals = userMeals?.meals.length;

    let withinDiet = 0;

    let offDiet = 0;

    let withinDietInSequence = 0;

    userMeals?.meals.filter((meal) => {
        if (meal.withinDiet === true) {
            withinDietInSequence++;
            withinDiet++;
        } else {
            withinDietInSequence = 0;
            offDiet++;
        }
    });

    return res
        .status(200)
        .send({ totalMeals, withinDietInSequence, withinDiet, offDiet });
}

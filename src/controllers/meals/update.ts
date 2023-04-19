import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const prisma = new PrismaClient();

export async function update(req: FastifyRequest, res: FastifyReply) {
    const createMealBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        withinDiet: z.boolean(),
        date: z.coerce.date(),
        time: z.coerce.string()
    });

    const dataParamsSchema = z.object({
        mealName: z.string()
    });

    const { mealName } = dataParamsSchema.parse(req.params);

    const { sessionId } = req.cookies;

    const { name, description, withinDiet, date, time } = createMealBodySchema.parse(
        req.body
    );

    const meal = await prisma.user.findUnique({
        where: {
            sessionId
        },
        select: {
            meals: {
                where: {
                    name: mealName
                }
            }
        }
    });

    if (!meal) {
        return res.status(404).send({ message: "Not founded." });
    }

    const updatedMeal = await prisma.meal.update({
        where: {
            id: meal?.meals[0].id
        },
        data: {
            name,
            description,
            withinDiet,
            date,
            time
        }
    });

    return res.status(200).send({ updatedMeal });
}

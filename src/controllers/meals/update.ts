import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const prisma = new PrismaClient();

export async function update(req: FastifyRequest, res: FastifyReply) {
    const createMealBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        withinDiet: z.boolean()
    });

    const dataParamsSchema = z.object({
        username: z.string(),
        mealName: z.string()
    });

    const { username, mealName } = dataParamsSchema.parse(req.params);

    const { name, description, withinDiet } = createMealBodySchema.parse(
        req.body
    );

    const meal = await prisma.user.findUnique({
        where: {
            name: username
        },
        select: {
            meals: {
                where: {
                    name: mealName,
                }
            }
        },
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
            withinDiet
        }
    });

    return res.status(200).send({ updated: updatedMeal });
}


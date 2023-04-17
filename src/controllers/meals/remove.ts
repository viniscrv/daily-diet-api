import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const prisma = new PrismaClient();

export async function remove(req: FastifyRequest, res: FastifyReply) {
    const dataParamsSchema = z.object({
        mealName: z.string()
    });

    const { mealName } = dataParamsSchema.parse(req.params);

    const { sessionId } = req.cookies;

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

    await prisma.meal.delete({
        where: {
            id: meal.meals[0].id
        }
    });

    return res.status(200).send();
}

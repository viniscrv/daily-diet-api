import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const prisma = new PrismaClient();

export async function get(req: FastifyRequest, res: FastifyReply) {
    const dataParamsSchema = z.object({
        username: z.string(),
        mealName: z.string()
    });

    const { username, mealName } = dataParamsSchema.parse(req.params);

    const meal = await prisma.user.findUnique({
        where: {
            name: username
        },
        select: {
            meals: {
                where: {
                    name: mealName
                }
            }
        }
    });

    return res.status(200).send({ meal });
}

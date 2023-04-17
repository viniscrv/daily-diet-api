import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const prisma = new PrismaClient();

export async function get(req: FastifyRequest, res: FastifyReply) {
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

    return res.status(200).send({ meal });
}

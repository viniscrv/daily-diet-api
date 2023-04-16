import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const prisma = new PrismaClient();

export async function getAll(req: FastifyRequest, res: FastifyReply) {
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

    return res.status(200).send({ userMeals });
}

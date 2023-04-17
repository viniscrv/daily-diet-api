import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

export async function getAll(req: FastifyRequest, res: FastifyReply) {

    const { sessionId } = req.cookies;

    const userMeals = await prisma.user.findUnique({
        where: {
            sessionId
        },
        select: {
            meals: true
        }
    });

    return res.status(200).send({ userMeals });
}

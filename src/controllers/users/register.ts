import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const prisma = new PrismaClient();

export async function register(req: FastifyRequest, res: FastifyReply) {
    const createUserBodySchema = z.object({
        name: z.string()
    });

    const { name } = createUserBodySchema.parse(req.body);

    let sessionId = req.cookies.sessionId;

    if (!sessionId) {
        sessionId = crypto.randomUUID();
        res.cookie("sessionId", sessionId, {
            path: "/",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        });
    }

    await prisma.user.create({
        data: {
            name,
            sessionId
        }
    });

    return res.status(201).send();
}

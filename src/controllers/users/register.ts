import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const prisma = new PrismaClient();

export async function register(req: FastifyRequest, res: FastifyReply) {
    const createUserBodySchema = z.object({
        name: z.string(),
    });

    const { name } = createUserBodySchema.parse(req.body);

    await prisma.user.create({
        data: {
            name,
        },
    });

    return res.status(201).send();
}
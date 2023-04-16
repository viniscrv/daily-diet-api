import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const prisma = new PrismaClient();

export async function register(req: FastifyRequest, res: FastifyReply) {
    const createMealBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        withinDiet: z.boolean()
    });

    const usernameParamsSchema = z.object({
        username: z.string()
    });

    const { username } = usernameParamsSchema.parse(req.params);

    const { name, description, withinDiet } = createMealBodySchema.parse(
        req.body
    );

    const user = await prisma.user.findUnique({
        where: {
            name: username
        }
    });

    if (!user) {
        return res.status(404).send({ message: "User not founded." });
    }

    await prisma.meal.create({
        data: {
            name,
            description,
            withinDiet,
            user: {
                connect: { id: user.id }
            }
        }
    });

    return res.status(201).send();
}

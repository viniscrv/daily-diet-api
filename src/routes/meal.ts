import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { z } from "zod";

const prisma = new PrismaClient();

export async function mealsRoutes(app: FastifyInstance) {
    app.post("/:username/meal", async (req, res) => {
        const createMealBodySchema = z.object({
            name: z.string(),
            description: z.string(),
            withinDiet: z.boolean(),
        });

        const userNameParamsSchema = z.object({
            username: z.string(),
        });

        const { username } = userNameParamsSchema.parse(req.params);

        const { name, description, withinDiet } = createMealBodySchema.parse(
            req.body
        );

        const user = await prisma.user.findUnique({
            where: {
                name: username,
            },
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
                    connect: { id: user.id },
                },
            },
        });

        return res.status(201).send();
    });
}

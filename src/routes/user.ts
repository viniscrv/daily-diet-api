import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { z } from "zod";

const prisma = new PrismaClient();

export async function userRoutes(app: FastifyInstance) {
    app.post("/user", async (req, res) => {
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
    });
}

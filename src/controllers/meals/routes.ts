import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getAll } from "./getAll";
import { update } from "./update";
import { remove } from "./remove";

export async function mealsRoutes(app: FastifyInstance) {
    app.post("/meal/:username", register);
    app.get("/meal/:username", getAll);
    app.put("/meal/:username/:mealName", update);
    app.delete("/meal/:username/:mealName", remove);
}
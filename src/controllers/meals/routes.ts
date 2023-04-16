import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getAll } from "./getAll";
import { update } from "./update";
import { remove } from "./remove";
import { get } from "./get";

export async function mealsRoutes(app: FastifyInstance) {
    app.post("/meal/:username", register);
    app.get("/meal/:username", getAll);
    app.get("/meal/:username/:mealName", get);
    app.put("/meal/:username/:mealName", update);
    app.delete("/meal/:username/:mealName", remove);
}

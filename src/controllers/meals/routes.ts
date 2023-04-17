import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getAll } from "./getAll";
import { update } from "./update";
import { remove } from "./remove";
import { get } from "./get";
import { checkSessionIdExists } from "../../middlewares/check-session-id-exists";

export async function mealsRoutes(app: FastifyInstance) {
    app.post("/meal", { preHandler: [checkSessionIdExists] }, register);
    app.get("/meal", { preHandler: [checkSessionIdExists] }, getAll);
    app.get("/meal/:mealName", { preHandler: [checkSessionIdExists] }, get);
    app.put("/meal/:mealName", { preHandler: [checkSessionIdExists] }, update);
    app.delete(
        "/meal/:mealName",
        { preHandler: [checkSessionIdExists] },
        remove
    );
}

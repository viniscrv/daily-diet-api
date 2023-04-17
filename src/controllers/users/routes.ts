import { FastifyInstance } from "fastify";
import { register } from "./register";
import { metrics } from "./metrics";
import { checkSessionIdExists } from "../../middlewares/check-session-id-exists";

export async function userRoutes(app: FastifyInstance) {
    app.post("/user", register);
    app.get("/user", { preHandler: [checkSessionIdExists] }, metrics);
}

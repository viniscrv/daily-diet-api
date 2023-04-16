import { FastifyInstance } from "fastify";
import { register } from "./register";
import { metrics } from "./metrics";

export async function userRoutes(app: FastifyInstance) {
    app.post("/user", register);
    app.get("/user/:username", metrics);
}

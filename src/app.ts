import fastify from "fastify";
import { userRoutes } from "./routes/user";
import { mealsRoutes } from "./routes/meal";

export const app = fastify();

app.register(userRoutes);
app.register(mealsRoutes);

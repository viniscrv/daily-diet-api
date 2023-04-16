import fastify from "fastify";
import { userRoutes } from "./controllers/users/routes";
import { mealsRoutes } from "./controllers/meals/routes";

export const app = fastify();

app.register(userRoutes);
app.register(mealsRoutes);

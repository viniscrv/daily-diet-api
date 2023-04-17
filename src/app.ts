import fastify from "fastify";
import { userRoutes } from "./controllers/users/routes";
import { mealsRoutes } from "./controllers/meals/routes";
import cookie from "@fastify/cookie";

export const app = fastify();

app.register(cookie);

app.register(userRoutes);
app.register(mealsRoutes);

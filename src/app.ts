import fastify from "fastify";
import { usersRoutes } from "./controllers/users/routes";
import { mealsRoutes } from "./controllers/meals/routes";
import { fastifyCookie } from "@fastify/cookie";

export const app = fastify();

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(mealsRoutes);

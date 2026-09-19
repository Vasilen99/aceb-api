import Fastify from "fastify";
import userRoutes from "./modules/users/routes.js";
import authRoutes from "./modules/auth/routes.js";
import healthRoutes from "./routes/health.js";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.get("/health", async () => ({
    status: "ok",
  }));

  app.register(healthRoutes, {
    prefix: "/api/v1/health",
  });

  app.register(userRoutes, {
    prefix: "/api/v1/users",
  });

  app.register(authRoutes, {
    prefix: "/api/v1/auth",
  });

  return app;
}

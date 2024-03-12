import express from "express";

// Controllers
import {
  settingsFetchAllController,
  settingsPatchController,
} from "../controllers/settings.controller.ts";

// Middlewares
import { isAuthenticatedMiddleware } from "../middlewares/isAuthenticated.middleware.ts";
import { isAdminMiddleware } from "../middlewares/isAdmin.middleware.ts";

const routerInstance = express.Router();

routerInstance.get("/list/all", settingsFetchAllController);
routerInstance.patch(
  "/patch",
  [isAuthenticatedMiddleware, isAdminMiddleware],
  settingsPatchController,
);

export { routerInstance };

import express from "express";

// Controllers
import {
  categoryCreateController,
  categoryDeleteController,
  categoryFetchAllController,
  categoryFetchOneController,
  categoryUpdateController,
} from "../controllers/category.controller.ts";

// Middlewares
import { isAuthenticatedMiddleware } from "../middlewares/isAuthenticated.middleware.ts";
import { isAdminMiddleware } from "../middlewares/isAdmin.middleware.ts";

const routerInstance = express.Router();

routerInstance.get("/list/all", categoryFetchAllController);
routerInstance.get("/list/:slug", categoryFetchOneController);
routerInstance.post(
  "/create",
  [isAuthenticatedMiddleware, isAdminMiddleware],
  categoryCreateController
);
routerInstance.delete(
  "/delete/:id",
  [isAuthenticatedMiddleware, isAdminMiddleware],
  categoryDeleteController
);
routerInstance.put(
  "/update/:id",
  [isAuthenticatedMiddleware, isAdminMiddleware],
  categoryUpdateController
);

export { routerInstance };

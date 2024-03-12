import express from "express";

// Controllers
import {
  groupsCreateController,
  groupsDeleteController,
  groupsFetchAllController,
  groupsFetchOneController,
  groupsSearchController,
  groupsUpdateController,
  impulseGroupCreateCheckout,
} from "../controllers/groups.controller.ts";

// Middlewares
import { isAuthenticatedMiddleware } from "../middlewares/isAuthenticated.middleware.ts";

const routerInstance = express.Router();

routerInstance.get("/list/all", groupsFetchAllController);
routerInstance.get('/search', groupsSearchController)
routerInstance.get("/list/:slug", groupsFetchOneController);
routerInstance.post(
  "/create",
  isAuthenticatedMiddleware,
  groupsCreateController
);
routerInstance.post('/impulse', isAuthenticatedMiddleware, impulseGroupCreateCheckout)
routerInstance.put(
  "/update/:id",
  isAuthenticatedMiddleware,
  groupsUpdateController
);
routerInstance.delete(
  "/delete/:id",
  isAuthenticatedMiddleware,
  groupsDeleteController
);

export { routerInstance };

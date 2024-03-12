import express from "express"
import { isAuthenticatedMiddleware } from "../middlewares/isAuthenticated.middleware.ts";
import { getAllPlans } from "../controllers/plan.controller.ts";

const routerInstance = express.Router();

routerInstance.get('/list/all', getAllPlans)

export {routerInstance}
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
import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Renomeia o arquivo com um nome específico
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif"
    ) {
      console.log('Arquivo válido')
    } else {
      throw new Error('Arquivo inválido')
    }
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "image-" + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({
  storage
})


const routerInstance = express.Router();

routerInstance.get("/list/all", groupsFetchAllController);
routerInstance.get('/search', groupsSearchController)
routerInstance.get("/list/:slug", groupsFetchOneController);
routerInstance.post(
  "/create",
  upload.single("group-image"),
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

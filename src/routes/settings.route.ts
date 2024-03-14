import express from "express";

// Controllers
import {
  settingsFetchAllController,
  settingsPatchController,
} from "../controllers/settings.controller.ts";

// Middlewares
import { isAuthenticatedMiddleware } from "../middlewares/isAuthenticated.middleware.ts";
import { isAdminMiddleware } from "../middlewares/isAdmin.middleware.ts";
import multer from "multer";
import path from "path";

const routerInstance = express.Router();
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads/");
  },
  filename: function (_req, file, cb) {
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

routerInstance.get("/list/all", settingsFetchAllController);
routerInstance.patch(
  "/patch",
  upload.single('config-image'),
  [isAuthenticatedMiddleware, isAdminMiddleware],
  settingsPatchController,
);

export { routerInstance };

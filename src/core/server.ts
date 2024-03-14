import express, { type Application } from "express";

import dotenv from "dotenv";
import fs from "fs";
import chalk from "chalk";
import cors from "cors";

import type { Users } from "@prisma/client";
import { networkInterfaces } from "os";

import { processResponseMiddleware } from "../middlewares/processResponse.middleware.ts";
import path from "path";

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
  extended: true
}))
app.use("/uploads",express.static(path.resolve('uploads')));

// @ts-ignore
app.use(processResponseMiddleware);

const routes: string[] = [];

declare global {
  namespace Express {
    export interface Request {
      decoded: {
        user: Users;
      };
    }

    export interface Response {
      processResponse: (status: number, message: string, data?: {}) => void;
    }
  }
}

fs.readdir("./src/routes", (event, files) => {
  if (!event) {
    files.forEach(async (file) => {
      const { routerInstance } = await import(`../routes/${file}`);

      routes.push(`/${file.replace(".route.ts", "")}`);
      app.use(`/${file.replace(".route.ts", "")}`, routerInstance);
    });
  }
});

app.listen(process.env.API_PORT, () => {
  console.clear();
  console.log(chalk.white("Iniciando a API..."));
  console.log("");
  const appUrl = networkInterfaces().en0?.find(
    (network) => network.family === "IPv4"
  );
  console.log("/uploads",path.resolve('uploads'));
  console.log(
    `| Endereço local: ${chalk.magenta(
      `http://localhost:${process.env.API_PORT}`
    )}`
  );

  if (appUrl) {
    console.log(
      `| Endereço na rede: ${chalk.magenta(
        `http://${appUrl.address}:${process.env.API_PORT}`
      )}`
    );
  }
});

import { Request, Response } from "express";
import { ContactController } from "../controllers/crmController";
import { AuthRoutes } from "./auth/AuthRoutes"
import { NPSRoutes } from "./nps/NPSRoutes";
import { UserRoutes } from "./user/UserRoutes";

const API_ROOT = "/api/"

export class Router {


    public contactController: ContactController = new ContactController();

    public routes(app): void {

        new AuthRoutes(app, API_ROOT)
        new NPSRoutes(app, API_ROOT)
        new UserRoutes(app, API_ROOT)
    }
}
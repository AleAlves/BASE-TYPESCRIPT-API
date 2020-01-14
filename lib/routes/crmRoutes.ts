import { Request, Response } from "express";
import { ContactController } from "../controllers/crmController";
import { AuthRoutes } from "../routes/auth/AuthRoutes"

const API_ROOT = "/api/"

export class Routes {

    private authRoutes: AuthRoutes

    public contactController: ContactController = new ContactController();

    public routes(app): void {

        this.authRoutes = new AuthRoutes(app, API_ROOT)

        // Create a new contact
        app.route('/contact').post(this.contactController.addNewContact);

        // Get all contacts
        app.route('/contact').get(this.contactController.getContacts)

        // get a specific contact
        app.route('/contact/:contactId').get(this.contactController.getContactWithID)

        // update a specific contact
        app.route('/contact/:contactId').put(this.contactController.updateContact)

        // delete a specific contact
        app.route('/contact/:contactId').delete(this.contactController.deleteContact)

        // edit specific contact
        app.route('/contact/:contactId')
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact)


    }
}
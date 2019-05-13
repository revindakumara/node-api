import { Request, Response, NextFunction } from "express";
import { EmailController } from "../controllers/emailController";

export class Routes {

    public emailController: EmailController = new EmailController()

    public routes(app): void {

        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })

        // Email 
        app.route('/v1/emails')
            .get(
                this.emailController.getEmails)

            // POST endpoint
            .post(this.emailController.addNewEmail);

        // Email detail
        app.route('/v1/emails/:emailId')
            // get specific email
            .get(this.emailController.getEmailWithID)
            .put(this.emailController.updateEmail)
            .delete(this.emailController.deleteEmail)

    }
}
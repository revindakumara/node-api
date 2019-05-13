import * as mongoose from 'mongoose';
import { EmailSchema } from '../models/emailModel';
import { Request, Response } from 'express';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

const Email = mongoose.model('Email', EmailSchema);
dotenv.config();

export class EmailController {

    public async addNewEmail(req: Request, res: Response) {
        let newEmail = new Email(req.body);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER_NAME,
                pass: process.env.MAIL_USER_PASS
            }
        });

        const mailOptions = {
            from: 'Demo',
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.content
        };
        let promise = new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    resolve(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve(1);
                }
            });
        });
        const date = new Date();
        let result;
        if (date.getHours() >= 8 && date.getHours() <= 17) {
            result = await promise;
        } else {
            result = 0;
        }
        if (result == 1) {
            newEmail.status = "SUCCESS";
        } else
            if (result == 0) {
                newEmail.status = "QUEUED";
            } else {
                newEmail.status = "FAILED";
            }
        newEmail.save((err, email) => {
            if (err) {
                res.send(err);
            }
            res.json(email);
        });
    }

    public getEmails(req: Request, res: Response) {
        Email.find({}, (err, email) => {
            if (err) {
                res.send(err);
            }
            res.json(email);
        });
    }

    public getEmailWithID(req: Request, res: Response) {
        Email.findById(req.params.emailId, (err, email) => {
            if (err) {
                res.send(err);
            }
            res.json(email);
        });
    }

    public updateEmail(req: Request, res: Response) {
        Email.findOneAndUpdate({ _id: req.params.emailId }, req.body, { new: true }, (err, email) => {
            if (err) {
                res.send(err);
            }
            res.json(email);
        });
    }

    public deleteEmail(req: Request, res: Response) {
        Email.findById(req.params.emailId, (err, email) => {            
            if (email) {
                Email.remove({ _id: req.params.emailId }, (err, email) => {
                    if (err) {
                        res.json({
                            id: req.params.emailId,
                            deleted: false,
                        });
                    }
                    res.json({
                        id: req.params.emailId,
                        deleted: true,
                    });
                });
            } else {
                res.json({
                    id: req.params.emailId,
                    deleted: false,
                });
            }
        });

    }



}
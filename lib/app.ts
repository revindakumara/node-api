import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/emailRoutes";
import * as mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config();

class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public mongoUrl: string = process.env.MONGO_URL;

    constructor() {
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);     
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {useNewUrlParser: true});        
    }

}

export default new App().app;

import * as mongoose from 'mongoose';
import { NPSSchema } from '../../models/nps/npsModel';
import { Request, Response } from "express";
import { BaseController } from "../BaseController"
import { HTTPResponse } from "../../models/http/HTTPResponse";


const NPS = mongoose.model('NPS', NPSSchema);

export class NPSController extends BaseController {   
    public addNewNPS(req: Request, res: Response) {
        //TODO: authorizedUser
        let nps = req.body
        nps.versionApp = NPSController.transformVersionToIntWithPadding(nps.versionApp)
        let newNPS = new NPS(req.body);

       //TODO: NPS.findById(req.params.npsID, (err, nps) => {
            // if (err) {
            //     super.send(res, null, err.name, 400, err.message);
            newNPS.save((err, nps) => {
                if (err) {
                    super.send(res, null, err.name, 400, err.message);
                }
                super.send(res, nps, 'Success', 200, 'Obrigado pela avaliação!');
            });
            // } else {
         //   super.send(res, nps, null, 200);
        //  NPS.findOneAndUpdate({ _id: req.params.npsID }, req.body, { new: true }, (err, nps) => {
        //     if (err) {
        //         super.send(res, null, err.name, 400, err.message);
        //     }
        //     super.send(res, nps, 'Success', 200, 'Obrigado pela avaliação!');
        // });
        //}
        //});
       
    }

    public static transformVersionToIntWithPadding(version: string) : Number {
        let versionArray: Array<string> = version.split('.')
        var versionWithPadding = ""

        versionArray.forEach(versionNumber => {
            let versionPadding = NPSController.leadingNullString(versionNumber, 4)
            versionWithPadding = versionWithPadding + versionPadding
        });
    
        return +versionWithPadding
     }

     public static leadingNullString(value: string|number, minSize: number): string {
        if (typeof value == "number") {
            value = "" + value;
        }
        let outString: string = '';
        let counter: number = minSize - value.length;
        if (counter > 0) {
            for (let i = 0; i < counter; i++) {
                outString += '0';
            }
        }
        return (value + outString);
    }
        


    public getNPS(req: Request, res: Response) {
        NPS.find({}, (err, nps) => {
            if (err) {
                super.send(res, null, err.name, 400, err.message);
            }
            super.send(res, nps, null, 200);
        });
    }

    public getNPSWithID(req: Request, res: Response) {
        NPS.findById(req.params.npsID, (err, nps) => {
            if (err) {
                super.send(res, null, err.name, 400, err.message);
            }
            super.send(res, nps, null, 200);
        });
    }

    public updateNPS(req: Request, res: Response) {
        NPS.findOneAndUpdate({ _id: req.params.npsID }, req.body, { new: true }, (err, nps) => {
            if (err) {
                super.send(res, null, err.name, 400, err.message);
            }
            super.send(res, nps, 'Success', 200, 'Obrigado pela avaliação!');
        });
    }

    public deleteNPS(req: Request, res: Response) {
        NPS.remove({ _id: req.params.npsID }, (err, nps) => {
            if (err) {
                super.send(res, null, err.name, 400, err.message);
            }
            super.send(res, nps, null, 200);
        });
    }

}
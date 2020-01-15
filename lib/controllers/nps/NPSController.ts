import * as mongoose from 'mongoose';
import { NPSSchema } from '../../models/nps/npsModel';
import { Request, Response } from "express";
import { BaseController } from "../BaseController"
import { HTTPResponse } from "../../models/http/HTTPResponse";


const NPS = mongoose.model('NPS', NPSSchema);

export class NPSController extends BaseController {   

    public addNewNPS(req: Request, res: Response) {

        let newNPS = new NPS(req.body);

        newNPS.save((err, nps) => {
            if (err) {
                super.send(res, null, 'Error', 400, err);
            }
            super.send(res, nps, 'Success', 200, 'Obrigado pela avaliação!');
        });
    }

    public getNPS(req: Request, res: Response) {
        NPS.find({}, (err, nps) => {
            if (err) {
                super.send(res, null, 'Error', 400, err);
            }
            super.send(res, nps, null, 200);
        });
    }

    public getNPSWithID(req: Request, res: Response) {
        NPS.findById(req.params.npsID, (err, nps) => {
            if (err) {
                super.send(res, null, 'Error', 400, err);
            }
            super.send(res, nps, null, 200);
        });
    }

    public updateNPS(req: Request, res: Response) {
        NPS.findOneAndUpdate({ _id: req.params.npsID }, req.body, { new: true }, (err, nps) => {
            if (err) {
                super.send(res, null, 'Error', 400, err);
            }
            super.send(res, nps, 'Success', 200, 'Obrigado pela avaliação!');
        });
    }

    public deleteNPS(req: Request, res: Response) {
        NPS.remove({ _id: req.params.npsID }, (err, nps) => {
            if (err) {
                super.send(res, null, 'Error', 400, err);
            }
            super.send(res, nps, null, 200);
        });
    }



// struct EvaluateService: EvaluateServiceProtocol {
    
//     func evaluate(request: Request, evaluateRequest: EvaluateRequest) throws -> EventLoopFuture<EvaluateResponseDto> {
//         return try request.authorizedUser().flatMap { user in
//             let intVersionWithPadding = self.transformVersionToIntWithPadding(version: evaluateRequest.version)
//             let evaluate = Evaluate(id: evaluateRequest.id, rate: evaluateRequest.rate, versionSO: evaluateRequest.versionSO, version: intVersionWithPadding, userID: evaluateRequest.userID)
            
//             return Evaluate.query(on: request).filter((\.version == evaluate.version)).filter(\.userID == user.id).first().flatMap { existingEvaluate in
//                 if var updatedEvaluate = existingEvaluate {
//                     updatedEvaluate.rate = evaluate.rate
//                     return updatedEvaluate.update(on: request).transform(to: EvaluateResponseDto.init(message: "Avaliação atualizada com sucesso!", evaluated: true))
                    
//                 }
//                 var evaluateModel = evaluate
//                 evaluateModel.userID = user.id
//                 return evaluateModel.save(on: request).transform(to: EvaluateResponseDto.init(message: "Avaliação salva com sucesso!", evaluated: true))
//                 }
//         }
//     }
    
//     func transformVersionToIntWithPadding(version: String) -> Int {
//         let versionArray = version.components(separatedBy: ".")
//         var versionWithPadding = ""
//         for versionNumbers in versionArray {
//             let versionPadding = String(format: "%04d",Int(versionNumbers) ?? 0)
//             versionWithPadding.append(versionPadding)
//         }
//         return Int(versionWithPadding) ?? 0
//     }

// }

}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const npsModel_1 = require("../../models/nps/npsModel");
const BaseController_1 = require("../BaseController");
const NPS = mongoose.model('NPS', npsModel_1.NPSSchema);
class NPSController extends BaseController_1.BaseController {
    addNewNPS(req, res) {
        //TODO: authorizedUser
        let nps = req.body;
        nps.versionApp = NPSController.transformVersionToIntWithPadding(nps.versionApp);
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
    static transformVersionToIntWithPadding(version) {
        let versionArray = version.split('.');
        var versionWithPadding = "";
        versionArray.forEach(versionNumber => {
            let versionPadding = NPSController.leadingNullString(versionNumber, 4);
            versionWithPadding = versionWithPadding + versionPadding;
        });
        return +versionWithPadding;
    }
    static leadingNullString(value, minSize) {
        if (typeof value == "number") {
            value = "" + value;
        }
        let outString = '';
        let counter = minSize - value.length;
        if (counter > 0) {
            for (let i = 0; i < counter; i++) {
                outString += '0';
            }
        }
        return (value + outString);
    }
    getNPS(req, res) {
        NPS.find({}, (err, nps) => {
            if (err) {
                super.send(res, null, err.name, 400, err.message);
            }
            super.send(res, nps, null, 200);
        });
    }
    getNPSWithID(req, res) {
        NPS.findById(req.params.npsID, (err, nps) => {
            if (err) {
                super.send(res, null, err.name, 400, err.message);
            }
            super.send(res, nps, null, 200);
        });
    }
    updateNPS(req, res) {
        NPS.findOneAndUpdate({ _id: req.params.npsID }, req.body, { new: true }, (err, nps) => {
            if (err) {
                super.send(res, null, err.name, 400, err.message);
            }
            super.send(res, nps, 'Success', 200, 'Obrigado pela avaliação!');
        });
    }
    deleteNPS(req, res) {
        NPS.remove({ _id: req.params.npsID }, (err, nps) => {
            if (err) {
                super.send(res, null, err.name, 400, err.message);
            }
            super.send(res, nps, null, 200);
        });
    }
}
exports.NPSController = NPSController;
//# sourceMappingURL=NPSController.js.map
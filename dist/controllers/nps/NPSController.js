"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const npsModel_1 = require("../../models/nps/npsModel");
const BaseController_1 = require("../BaseController");
const NPS = mongoose.model('NPS', npsModel_1.NPSSchema);
class NPSController extends BaseController_1.BaseController {
    addNewNPS(req, res) {
        let newNPS = new NPS(req.body);
        newNPS.save((err, nps) => {
            if (err) {
                super.send(res, null, err.name, 400, err.message);
            }
            super.send(res, nps, 'Success', 200, 'Obrigado pela avaliação!');
        });
    }
    getNPS(req, res) {
        NPS.find({}, (err, nps) => {
            if (err) {
                super.send(res, null, 'Error', 400, err);
            }
            super.send(res, nps, null, 200);
        });
    }
    getNPSWithID(req, res) {
        NPS.findById(req.params.npsID, (err, nps) => {
            if (err) {
                super.send(res, null, 'Error', 400, err);
            }
            super.send(res, nps, null, 200);
        });
    }
    updateNPS(req, res) {
        NPS.findOneAndUpdate({ _id: req.params.npsID }, req.body, { new: true }, (err, nps) => {
            if (err) {
                super.send(res, null, 'Error', 400, err);
            }
            super.send(res, nps, 'Success', 200, 'Obrigado pela avaliação!');
        });
    }
    deleteNPS(req, res) {
        NPS.remove({ _id: req.params.npsID }, (err, nps) => {
            if (err) {
                super.send(res, null, 'Error', 400, err);
            }
            super.send(res, nps, null, 200);
        });
    }
}
exports.NPSController = NPSController;
//# sourceMappingURL=NPSController.js.map
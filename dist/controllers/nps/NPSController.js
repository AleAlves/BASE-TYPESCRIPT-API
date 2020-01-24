"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const npsModel_1 = require("../../models/nps/npsModel");
const BaseController_1 = require("../BaseController");
const HTTPStatus_1 = require("../../models/http/HTTPStatus");
const NPS = mongoose.model('NPS', npsModel_1.NPSSchema);
class NPSController extends BaseController_1.BaseController {
    add(req, res) {
        //TODO: authorizedUser
        let nps = req.body;
        nps.userID = super.session(req).userID;
        nps.versionApp = NPSController.transformVersionToIntWithPadding(nps.versionApp);
        let newNPS = new NPS(req.body);
        NPS.findOneAndUpdate({ 'userID': newNPS.userID, 'versionApp': newNPS.versionApp }, newNPS, (err, nps) => {
            if (nps) {
                super.send(res, nps, 'Obrigado pela avaliação!');
            }
            else {
                newNPS.save((err, nps) => {
                    if (err) {
                        super.send(res, undefined, undefined, new HTTPStatus_1.HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
                    }
                    super.send(res, nps, 'Obrigado pela avaliação!');
                });
            }
        });
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
    get(req, res) {
        NPS.find({}, (err, nps) => {
            if (err) {
                super.send(res, undefined, undefined, new HTTPStatus_1.HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            }
            super.send(res, nps);
        });
    }
    getWithID(req, res) {
        NPS.findById(req.params.npsID, (err, nps) => {
            if (err) {
                super.send(res, undefined, undefined, new HTTPStatus_1.HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            }
            super.send(res, nps);
        });
    }
    update(req, res) {
        NPS.findOneAndUpdate({ _id: req.params.npsID }, req.body, { new: true }, (err, nps) => {
            if (err) {
                super.send(res, undefined, undefined, new HTTPStatus_1.HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            }
            super.send(res, nps);
        });
    }
    delete(req, res) {
        NPS.remove({ _id: req.params.npsID }, (err, nps) => {
            if (err) {
                super.send(res, undefined, undefined, new HTTPStatus_1.HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            }
            super.send(res, nps);
        });
    }
}
exports.NPSController = NPSController;
//# sourceMappingURL=NPSController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const BaseController_1 = require("../BaseController");
const UserModel_1 = require("../../models/user/UserModel");
const User = mongoose.model('User', UserModel_1.UserSchema);
class UserController extends BaseController_1.BaseController {
    create(req, res) {
        let newUser = new User(req.body);
        newUser.save((error, user) => {
            if (error) {
                super.send(res, error);
            }
            super.send(res, user);
        });
    }
    get(req, res) {
        console.log("\n=======\n");
        console.log("get user SESSION: " + JSON.stringify(super.session(req)));
        console.log("\n=======\n");
        User.find({}, (error, user) => {
            if (error) {
                super.send(res, error);
            }
            super.send(res, user);
        });
    }
    find(req, res) {
        User.findById(req.params.firebaseID, (error, user) => {
            if (error) {
                super.send(res, error);
            }
            super.send(res, user);
        });
    }
    update(req, res) {
        User.findOneAndUpdate({ _id: req.params.firebaseID }, req.body, { new: true }, (error, user) => {
            if (error) {
                super.send(res, error);
            }
            super.send(res, user);
        });
    }
    delete(req, res) {
        User.remove({ _id: req.params.firebaseID }, (error, user) => {
            if (error) {
                super.send(res, error);
            }
            super.send(res, user);
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.UserSchema = new Schema({
    firebaseID: {
        type: String,
        required: 'FirebaseID required'
    },
    name: {
        type: String,
        required: 'Name required'
    },
    email: {
        type: String,
        required: 'Email required'
    },
    picture: {
        type: String,
        required: 'Picture required'
    },
    created: {
        type: Date,
        default: Date.now
    }
});
//# sourceMappingURL=UserModel.js.map
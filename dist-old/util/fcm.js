"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const cab5flutter_firebase_adminsdk_iiwf3_77991809e5_json_1 = __importDefault(require("../config/cab5flutter-firebase-adminsdk-iiwf3-77991809e5.json"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(cab5flutter_firebase_adminsdk_iiwf3_77991809e5_json_1.default),
    // databaseURL: '<your-database-url>'
});
const sendNotification = (registrationToken, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield firebase_admin_1.default.messaging().send({
            token: registrationToken,
            notification: payload.notification,
            data: payload.data
        });
        console.log(`FCM notification sent: ${response}`);
    }
    catch (error) {
        console.error(`Error sending FCM notification: ${error}`);
    }
});
exports.sendNotification = sendNotification;

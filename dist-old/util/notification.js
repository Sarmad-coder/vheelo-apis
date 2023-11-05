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
Object.defineProperty(exports, "__esModule", { value: true });
exports.notify = void 0;
const fcm_1 = require("./fcm");
const notify = (registrationToken, title, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = {
            notification: {
                title,
                body
            },
            data: {
            // optional data payload
            }
        };
        yield (0, fcm_1.sendNotification)(registrationToken, payload);
        console.log("notification sent");
    }
    catch (error) {
        console.log("no notification sent");
    }
});
exports.notify = notify;

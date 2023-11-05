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
exports.login = exports.create = void 0;
const user_1 = __importDefault(require("../../../services/user"));
const apiError_1 = require("../../../helpers/apiError");
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone } = req.body;
        const old = yield user_1.default.findOne({ phone });
        if (old != null) {
            return next(new apiError_1.BadRequestError("This phone already exists"));
        }
        const data = yield user_1.default.create(req["validData"]);
        return res.json({ status: "success", data });
    }
    catch (error) {
        console.log(error.message);
        return next(new apiError_1.ValidationError("Invalid fields: " + JSON.stringify(error)));
    }
});
exports.create = create;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone } = req.body;
        const data = yield user_1.default.findOne({ phone });
        if (data == null) {
            return next(new apiError_1.NotFoundError("No records found"));
        }
        return res.json({ status: "success", data });
    }
    catch (error) {
        return next(new apiError_1.ValidationError("Invalid phone number or password", error));
    }
});
exports.login = login;

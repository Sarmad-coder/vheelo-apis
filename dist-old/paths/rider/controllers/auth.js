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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFunc = exports.vehicleInfo = exports.documents = exports.login = exports.create = void 0;
const rider_1 = __importDefault(require("../../../services/rider"));
const apiError_1 = require("../../../helpers/apiError");
const riderDocument_1 = __importDefault(require("../../../services/riderDocument"));
const vehicleInfo_1 = __importDefault(require("../../../services/vehicleInfo"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone } = req.body;
        const old = yield rider_1.default.findOne({ phone });
        if (old != null) {
            return next(new apiError_1.BadRequestError("This phone already exists"));
        }
        const data = yield rider_1.default.create(req["validData"]);
        return res.json({ status: "success", data });
    }
    catch (error) {
        return next(new apiError_1.ValidationError("Invalid fields: " + JSON.stringify(error)));
    }
});
exports.create = create;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone } = req.body;
        const data = yield rider_1.default.findOne({ phone });
        if (data == null) {
            return next(new apiError_1.NotFoundError("No records found"));
        }
        const _a = req["validData"], { phone: phoneNum } = _a, others = __rest(_a, ["phone"]);
        yield rider_1.default.updateByQuery({ phone }, others);
        return res.json({ status: "success", data });
    }
    catch (error) {
        return next(new apiError_1.ValidationError("Invalid phone number or password", error));
    }
});
exports.login = login;
const documents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rider } = req.body;
        const old = yield riderDocument_1.default.findOne({ rider });
        if (old != null) {
            yield riderDocument_1.default.updateByFilter({ rider }, Object.assign({}, req["validData"]));
            return res.json({ status: "success", data: yield riderDocument_1.default.findOne({ rider }) });
        }
        const data = yield riderDocument_1.default.create(req["validData"]);
        return res.json({ status: "success", data });
    }
    catch (error) {
        return next(new apiError_1.ValidationError("Invalid fields", error));
    }
});
exports.documents = documents;
const vehicleInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rider } = req.body;
        const old = yield vehicleInfo_1.default.findOne({ rider });
        if (old != null) {
            return res.json({ status: "success", data: yield vehicleInfo_1.default.findOne({ rider }) });
        }
        const data = yield vehicleInfo_1.default.create(req["validData"]);
    }
    catch (error) {
        return next(new apiError_1.ValidationError("Invalid fields", error));
    }
});
exports.vehicleInfo = vehicleInfo;
const uploadFunc = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filePath = req.file.path;
        if (filePath == undefined) {
            return next(new apiError_1.BadRequestError("No file received"));
        }
        return res.json({ status: "success", data: filePath });
    }
    catch (error) {
        return next(new apiError_1.BadRequestError("No file received"));
    }
});
exports.uploadFunc = uploadFunc;

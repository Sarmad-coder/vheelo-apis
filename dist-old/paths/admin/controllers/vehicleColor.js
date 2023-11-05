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
exports.create = exports.findByQuery = exports.findById = exports.findAll = void 0;
const vehicleColor_1 = __importDefault(require("../../../services/vehicleColor"));
const apiError_1 = require("../../../helpers/apiError");
// exporting common controllers
const vehicleColor_2 = require("../../common/controllers/vehicleColor");
Object.defineProperty(exports, "findAll", { enumerable: true, get: function () { return vehicleColor_2.findAll; } });
Object.defineProperty(exports, "findById", { enumerable: true, get: function () { return vehicleColor_2.findById; } });
Object.defineProperty(exports, "findByQuery", { enumerable: true, get: function () { return vehicleColor_2.findByQuery; } });
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { color, model } = req.body;
        const old = yield vehicleColor_1.default.findOne({ color, model });
        if (old != null) {
            return next(new apiError_1.BadRequestError("This color already exists for this model"));
        }
        const data = yield vehicleColor_1.default.create(req["validData"]);
        return res.json({ status: "success", data });
    }
    catch (error) {
        return next(new apiError_1.ValidationError("Invalid fields: " + JSON.stringify(error)));
    }
});
exports.create = create;

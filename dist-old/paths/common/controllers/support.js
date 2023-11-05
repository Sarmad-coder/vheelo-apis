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
exports.deleteChat = exports.deleteOne = exports.personChat = exports.findById = exports.findByQuery = exports.findAll = void 0;
const support_1 = __importDefault(require("../../../services/support"));
const apiError_1 = require("../../../helpers/apiError");
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json({ status: "success", data: yield support_1.default.findAll() });
    }
    catch (error) {
        return next(new apiError_1.NotFoundError("No records found"));
    }
});
exports.findAll = findAll;
const findByQuery = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json({ status: "success", data: yield support_1.default.findByQuery(req.query) });
    }
    catch (error) {
        return next(new apiError_1.ValidationError("Invalid query", error));
    }
});
exports.findByQuery = findByQuery;
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json({ status: "success", data: yield support_1.default.findById(req.params.id) });
    }
    catch (error) {
        return next(new apiError_1.ValidationError("Invalid Id", error));
    }
});
exports.findById = findById;
const personChat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sender } = req.body;
        const data = yield support_1.default.findByQuery({ sender });
        return res.json({ status: "success", data });
    }
    catch (error) {
        return next(new apiError_1.NotFoundError("No record found", error));
    }
});
exports.personChat = personChat;
const deleteOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        yield support_1.default.deleteById(id);
        return res.json({ status: "success" });
    }
    catch (error) {
        return next(new apiError_1.ValidationError("Invalid ID"));
    }
});
exports.deleteOne = deleteOne;
const deleteChat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sender } = req.body;
        yield support_1.default.deleteRecords({ sender });
        return res.json({ status: "success" });
    }
    catch (error) {
        return next(new apiError_1.ValidationError("Invalid ID"));
    }
});
exports.deleteChat = deleteChat;

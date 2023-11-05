"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../../../middlewares/validate");
const support_1 = require("../controllers/support");
const router = express_1.default.Router();
router.post("/add", (0, validate_1.validateInputs)(["text", "sender"]), support_1.create);
router.get("/getAll", support_1.findAll);
router.get("/getByQuery", support_1.findByQuery);
router.get("/getById/:id", support_1.findById);
router.post("/deleteOne", support_1.deleteOne);
router.post("/deleteChat", support_1.deleteChat);
exports.default = router;

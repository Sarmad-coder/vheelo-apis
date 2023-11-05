"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vehicleColor_1 = require("../controllers/vehicleColor");
const router = express_1.default.Router();
router.get("/getAll", vehicleColor_1.findAll);
router.get("/getByQuery", vehicleColor_1.findByQuery);
router.get("/getById/:id", vehicleColor_1.findById);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vehicleModel_1 = require("../controllers/vehicleModel");
const router = express_1.default.Router();
router.get("/getAll", vehicleModel_1.findAll);
router.get("/getByQuery", vehicleModel_1.findByQuery);
router.get("/getById/:id", vehicleModel_1.findById);
exports.default = router;

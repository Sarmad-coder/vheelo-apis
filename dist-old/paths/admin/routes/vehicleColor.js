"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../../../middlewares/validate");
const vehicleColor_1 = require("../controllers/vehicleColor");
const router = express_1.default.Router();
router.post("/add", (0, validate_1.validateInputs)(["brand", "model", "color"]), vehicleColor_1.create);
router.get("/getAll", vehicleColor_1.findAll);
router.get("/getByQuery", vehicleColor_1.findByQuery);
router.get("/getById/:id", vehicleColor_1.findById);
exports.default = router;

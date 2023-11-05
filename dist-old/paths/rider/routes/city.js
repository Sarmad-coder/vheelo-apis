"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const city_1 = require("../controllers/city");
const router = express_1.default.Router();
router.get("/getAll", city_1.findAll);
router.get("/getByQuery", city_1.findByQuery);
router.get("/getById/:id", city_1.findById);
exports.default = router;

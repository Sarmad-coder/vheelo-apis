"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rider_1 = require("../controllers/rider");
const router = express_1.default.Router();
router.get("/getAll", rider_1.findAll);
router.get("/getByQuery", rider_1.findByQuery);
router.get("/getById/:id", rider_1.findById);
exports.default = router;

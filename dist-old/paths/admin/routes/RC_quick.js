"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RC_quick_1 = require("../controllers/RC_quick");
const validate_1 = require("../../../middlewares/validate");
const router = express_1.default.Router();
router.post("/add", (0, validate_1.validateInputs)(["name", "logo", "priceKm"]), RC_quick_1.create);
router.get("/getAll", RC_quick_1.findAll);
router.get("/getByQuery", RC_quick_1.findByQuery);
router.get("/getById/:id", RC_quick_1.findById);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const validate_1 = require("../../../middlewares/validate");
const auth_1 = require("../controllers/auth");
router.post("/login", (0, validate_1.validateInputs)(["phone", "fcmToken", "currLat", "currLon"]), auth_1.login);
router.post("/register", (0, validate_1.validateInputs)(["firstName", "lastName", "phone", "email", "fcmToken", "currLat", "currLon"]), auth_1.create);
exports.default = router;

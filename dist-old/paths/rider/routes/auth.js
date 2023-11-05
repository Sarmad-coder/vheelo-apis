"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const validate_1 = require("../../../middlewares/validate");
const auth_1 = require("../controllers/auth");
const upload_1 = require("../../../util/upload");
router.post("/upload", upload_1.upload.single('file'), auth_1.uploadFunc);
router.post("/login", (0, validate_1.validateInputs)(["phone", "fcmToken", "currLat", "currLon"]), auth_1.login);
router.post("/register", (0, validate_1.validateInputs)(["firstName", "lastName", "phone", "email", "fcmToken", "currLat", "currLon", "image", "dob", "city"]), auth_1.create);
// router.post("/documents", validateInputs(["rider", "plateNumber", "plateImage", "status"]), documents);
router.post("/license", (0, validate_1.validateInputs)(["rider", "licenseImage", "licenseNumber",]), auth_1.documents);
router.post("/cnic", (0, validate_1.validateInputs)(["rider", "cnicFront", "cnicBack"]), auth_1.documents);
router.post("/vehicleInfo", (0, validate_1.validateInputs)(["rider", "model", "plateNumber", "plateImage", "vehicleImage", "cardFront", "cardBack"]), auth_1.vehicleInfo);
exports.default = router;

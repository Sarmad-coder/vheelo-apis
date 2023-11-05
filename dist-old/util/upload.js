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
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudinary = cloudinary_1.default.v2;
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
// Configuration
cloudinary.config({
    cloud_name: "dpxo0k5hb",
    api_key: "698127623914963",
    api_secret: "NwVQjCYqEBccFxpfRhJJzpg8G-I"
});
const folder = "uploads";
const parameters = {
    cloudinary: cloudinary,
    params: {
        folder,
        format: (req, file) => __awaiter(void 0, void 0, void 0, function* () { return 'png'; }),
        public_id: function (req, file) {
            const newFileName2 = `${Date.now()}-${file.originalname}`;
            return newFileName2;
        }
    }
};
const storage = new multer_storage_cloudinary_1.CloudinaryStorage(parameters);
exports.upload = (0, multer_1.default)({
    storage: storage
});

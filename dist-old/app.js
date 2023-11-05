"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const router_1 = __importDefault(require("./router"));
(0, router_1.default)(app);
app.get("/", (req, res) => { res.json({ message: "hello" }); });
const apiErrorHandler_1 = __importDefault(require("./middlewares/apiErrorHandler"));
app.use(apiErrorHandler_1.default);
exports.default = app;

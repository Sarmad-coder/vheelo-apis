"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const auth_1 = __importDefault(require("./auth"));
const RC_quick_1 = __importDefault(require("./RC_quick"));
function Router(app, route = "/user") {
    app.use(route + "/user", user_1.default);
    app.use(route + "/auth", auth_1.default);
    app.use(route + "/rideCatQuick", RC_quick_1.default);
}
exports.default = Router;

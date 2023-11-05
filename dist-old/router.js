"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("./paths/user/routes"));
const routes_2 = __importDefault(require("./paths/admin/routes"));
const routes_3 = __importDefault(require("./paths/rider/routes"));
function ROUTER(app) {
    (0, routes_1.default)(app);
    (0, routes_2.default)(app);
    (0, routes_3.default)(app);
}
exports.default = ROUTER;

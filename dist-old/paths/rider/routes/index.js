"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const city_1 = __importDefault(require("./city"));
const RC_quick_1 = __importDefault(require("./RC_quick"));
const rider_1 = __importDefault(require("./rider"));
const support_1 = __importDefault(require("./support"));
const vehicleBrand_1 = __importDefault(require("./vehicleBrand"));
const vehicleColor_1 = __importDefault(require("./vehicleColor"));
const vehicleModel_1 = __importDefault(require("./vehicleModel"));
function Router(app, route = "/rider") {
    app.use(route + "/auth", auth_1.default);
    app.use(route + "/city", city_1.default);
    app.use(route + "/rideCatQuick", RC_quick_1.default);
    app.use(route + "/rider", rider_1.default);
    app.use(route + "/support", support_1.default);
    app.use(route + "/vehicleBrand", vehicleBrand_1.default);
    app.use(route + "/vehicleColor", vehicleColor_1.default);
    app.use(route + "/vehicleModel", vehicleModel_1.default);
}
exports.default = Router;

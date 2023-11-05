"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByQuery = exports.findById = exports.findAll = void 0;
// exporting common controllers
const vehicleColor_1 = require("../../common/controllers/vehicleColor");
Object.defineProperty(exports, "findAll", { enumerable: true, get: function () { return vehicleColor_1.findAll; } });
Object.defineProperty(exports, "findById", { enumerable: true, get: function () { return vehicleColor_1.findById; } });
Object.defineProperty(exports, "findByQuery", { enumerable: true, get: function () { return vehicleColor_1.findByQuery; } });

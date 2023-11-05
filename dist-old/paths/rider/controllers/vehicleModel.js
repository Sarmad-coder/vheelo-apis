"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByQuery = exports.findById = exports.findAll = void 0;
// exporting common controllers
const vehicleModel_1 = require("../../common/controllers/vehicleModel");
Object.defineProperty(exports, "findAll", { enumerable: true, get: function () { return vehicleModel_1.findAll; } });
Object.defineProperty(exports, "findById", { enumerable: true, get: function () { return vehicleModel_1.findById; } });
Object.defineProperty(exports, "findByQuery", { enumerable: true, get: function () { return vehicleModel_1.findByQuery; } });

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehicleModel_1 = __importDefault(require("../models/vehicleModel"));
function findAll() {
    return vehicleModel_1.default.findAll();
}
function findOne(query) {
    return vehicleModel_1.default.findOne({ where: query });
}
function create(query) {
    return vehicleModel_1.default.create(query);
}
function findByQuery(query) {
    return vehicleModel_1.default.findAll({ where: query });
}
function findById(id) {
    return vehicleModel_1.default.findOne({ where: { id } });
}
exports.default = { findAll, findOne, create, findByQuery, findById };

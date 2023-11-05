"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const R_quick_1 = __importDefault(require("../models/R_quick"));
function findAll() {
    return R_quick_1.default.findAll();
}
function findOne(query) {
    return R_quick_1.default.findOne({ where: query });
}
function create(query) {
    return R_quick_1.default.create(query);
}
function findByQuery(query) {
    return R_quick_1.default.findAll({ where: query });
}
function findById(id) {
    return R_quick_1.default.findOne({ where: { id } });
}
function updateById(id, query) {
    return R_quick_1.default.update(query, { where: { id }, returning: true, });
}
exports.default = { findAll, findOne, create, findByQuery, findById, updateById };

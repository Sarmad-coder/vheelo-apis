"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const riderDocument_1 = __importDefault(require("../models/riderDocument"));
function findAll() {
    return riderDocument_1.default.findAll();
}
function findOne(query) {
    return riderDocument_1.default.findOne({ where: query });
}
function create(query) {
    return riderDocument_1.default.create(query);
}
function findByQuery(query) {
    return riderDocument_1.default.findAll({ where: query });
}
function findById(id) {
    return riderDocument_1.default.findOne({ where: { id } });
}
function updateById(id, query) {
    return riderDocument_1.default.update(query, { where: { id } });
}
function updateByFilter(filter, query) {
    return riderDocument_1.default.update(query, { where: filter });
}
exports.default = { findAll, findOne, create, findByQuery, findById, updateById, updateByFilter };

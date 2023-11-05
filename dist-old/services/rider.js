"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rider_1 = __importDefault(require("../models/rider"));
function findAll() {
    return rider_1.default.findAll();
}
function findOne(query) {
    return rider_1.default.findOne({ where: query });
}
function create(query) {
    return rider_1.default.create(query);
}
function findByQuery(query) {
    return rider_1.default.findAll({ where: query });
}
function findById(id) {
    return rider_1.default.findOne({ where: { id } });
}
function updateByQuery(query, update) {
    return rider_1.default.update(update, { where: query });
}
exports.default = { findAll, findOne, create, findByQuery, findById, updateByQuery };

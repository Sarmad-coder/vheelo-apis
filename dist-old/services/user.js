"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
function findAll() {
    return user_1.default.findAll();
}
function findOne(query) {
    return user_1.default.findOne({ where: query });
}
function create(query) {
    return user_1.default.create(query);
}
function findByQuery(query) {
    return user_1.default.findAll({ where: query });
}
function findById(id) {
    return user_1.default.findOne({ where: { id } });
}
function deleteById(id) {
    return user_1.default.destroy({ where: { id } });
}
function deleteByQuery(query) {
    return user_1.default.destroy({ where: query });
}
exports.default = { findAll, findOne, create, findByQuery, findById };

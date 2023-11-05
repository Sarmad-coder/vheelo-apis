"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const city_1 = __importDefault(require("../models/city"));
function findAll() {
    return city_1.default.findAll();
}
function findOne(query) {
    return city_1.default.findOne({ where: query });
}
function create(query) {
    return city_1.default.create(query);
}
function findByQuery(query) {
    return city_1.default.findAll({ where: query });
}
function findById(id) {
    return city_1.default.findOne({ where: { id } });
}
// function to delete a record with id
function deleteById(id) {
    return city_1.default.destroy({ where: { id } });
}
exports.default = { findAll, findOne, create, findByQuery, findById, deleteById };

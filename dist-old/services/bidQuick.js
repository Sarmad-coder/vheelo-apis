"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bidQuick_1 = __importDefault(require("../models/bidQuick"));
function findAll() {
    return bidQuick_1.default.findAll();
}
function findOne(query) {
    return bidQuick_1.default.findOne({ where: query });
}
function create(query) {
    return bidQuick_1.default.create(query);
}
function findByQuery(query) {
    return bidQuick_1.default.findAll({ where: query });
}
function findById(id) {
    return bidQuick_1.default.findByPk(id);
}
// function to delete a record with id
function deleteById(id) {
    return bidQuick_1.default.destroy({ where: { id } });
}
function updateById(id, query) {
    return bidQuick_1.default.update(query, { where: { id }, returning: true, });
}
exports.default = { findAll, findOne, create, findByQuery, findById, deleteById, updateById };

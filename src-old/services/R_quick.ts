import Model from "../models/R_quick";

function findAll() {
    return Model.findAll();
}

function findOne(query) {
    return Model.findOne({ where: query });
}

function create(query) {
    return Model.create(query);
}

function findByQuery(query) {
    return Model.findAll({ where: query });
}

function findById(id) {
    return Model.findOne({ where: { id } });
}

function updateById(id: string, query: {}) {
    return Model.update(query, { where: { id } });
}

export default { findAll, findOne, create, findByQuery, findById, updateById };

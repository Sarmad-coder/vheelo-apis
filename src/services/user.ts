import Model from "../models/user";

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

function deleteById(id) {
    return Model.destroy({ where: { id } });
}

function deleteByQuery(query) {
    return Model.destroy({ where: query });
}

export default { findAll, findOne, create, findByQuery, findById };

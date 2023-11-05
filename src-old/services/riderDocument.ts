import Model, { RiderDocumentDocument as Document } from "../models/riderDocument";

function findAll() {
    return Model.findAll();
}

function findOne(query: Partial<Document>) {
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
    return Model.update(query, { where: { id } })
}

function updateByFilter(filter: {}, query: Partial<Document>) {
    return Model.update(query, { where: filter })
}

export default { findAll, findOne, create, findByQuery, findById, updateById, updateByFilter };

import Model from "../models/rider";

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

function updateByQuery(query, update) {
    return Model.update(update, { where: query });

}
export default { findAll, findOne, create, findByQuery, findById, updateByQuery }

import Model from "../models/bidQuick";

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
    return Model.findByPk(id);
}

// function to delete a record with id
function deleteById(id) {
    return Model.destroy({ where: { id } });
}

function updateById(id: string, query: {}) {
    return Model.update(query, { where: { id }, returning: true,});
}

export default { findAll, findOne, create, findByQuery, findById, deleteById, updateById };

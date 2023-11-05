import Model from "../models/support";

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

// function to delete a record with id
function deleteById(id) {
    return Model.destroy({ where: { id } });
}

function deleteRecords(query) {
    return Model.destroy({ where: query });
}

export default { findAll, findOne, create, findByQuery, findById, deleteById, deleteRecords };

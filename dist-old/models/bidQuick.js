"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const BidQuickSchema = db_1.sequelize.define("bidQuick", {
    amount: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    rider: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    ride: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "enabled",
    },
}, { timestamps: true, });
exports.default = BidQuickSchema;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const userSchema = db_1.sequelize.define("users", {
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    fcmToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    currLat: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    currLon: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "https://res.cloudinary.com/dpxo0k5hb/image/upload/v1682782197/uploads/1682782196342-Driver%20side-58.png.png"
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "pending",
    }
}, { timestamps: true, });
exports.default = userSchema;

import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type R_quickDocument = Document & {
    rider: string;
    user: string;
    category: string;
    pickupLat: string;
    pickupLon: string;
    pickupLocation: string;
    dropLat: string;
    dropLon: string;
    dropLocation: string;
    bidPrice: string;
    instruction: string;
    range: string;
    rating: string;
    status: string;
}


const R_quickSchema = sequelize.define("R_quick",
    {
        rider: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pickupLat: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pickupLon: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pickupLocation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dropLat: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dropLon: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dropLocation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bidPrice: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        instruction: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        range: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "pending",
        }
    },
    { timestamps: true }
)

export default R_quickSchema

import User from "./user"
import riderSchema from "./rider"


User.hasMany(R_quickSchema,{
    foreignKey:'user',
    as:'ridesr',
    onDelete: 'CASCADE',
    onUpdate:"CASCADE"
})


R_quickSchema.belongsTo(User,{
    foreignKey:'user',
    as:'ridesu',
    onDelete: 'CASCADE',
    onUpdate:"CASCADE"
})
riderSchema.hasMany(R_quickSchema,{
    foreignKey:'rider',
    as:'ar',
    onDelete: 'CASCADE',
    onUpdate:"CASCADE"
})


R_quickSchema.belongsTo(riderSchema,{
    foreignKey:'rider',
    as:'ars',
    onDelete: 'CASCADE',
    onUpdate:"CASCADE"
})

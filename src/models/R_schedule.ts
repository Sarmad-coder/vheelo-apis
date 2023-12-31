import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type R_quickDocument = Document & {
    rider: string;
    user: string;
    category: string;
    pickupLat: string;
    pickupLon: string;
    pickupLocation: string;
    pickupTime:string;
    range: string;
    status: string;
}


const R_quickSchema = sequelize.define("R_schedule",
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
        range: {
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
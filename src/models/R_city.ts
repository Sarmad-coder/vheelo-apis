import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type R_quickDocument = Document & {
    rider: string;
    user: string;
    category: string;
    pickupLocation: string;
    pickupTime:string;
    pickupLat:string;
    pickupLng:string;
    dropLocation: string;
    dropLat:string;
    dropLng:string;
    passenger:string;
    bidPrice: string;
    instruction: string;
    range: string;
    status: string;
}


const R_quickSchema = sequelize.define("R_city",
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
        pickupLocation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pickupTime: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pickupLat: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pickupLng: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pessenger: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dropLocation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dropLat: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dropLng: {
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
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "pending",
        }
    },
    { timestamps: true }
)

export default R_quickSchema
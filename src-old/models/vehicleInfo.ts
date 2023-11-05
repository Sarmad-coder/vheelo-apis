// model, number plate (number and image), image, vehicle Card (front- back)
import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type VehicleInfoDocument = Document & {
    rider: string;
    model: string;
    plateNumber: string;
    plateImage: string;
    vehicleImage: string;
    cardFront: string;
    cardBack: string;
    status: string;
}


const vehicleInfoSchema = sequelize.define("vehicleInfos",
    {
        rider: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        plateNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        plateImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        vehicleImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cardFront: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cardBack: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    { timestamps: true, }
)

export default vehicleInfoSchema

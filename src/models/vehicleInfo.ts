// model, number plate (number and image), image, vehicle Card (front- back)
import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type VehicleInfoDocument = Document & {
    rider: string;
    categoryId:string;
    licenseNumber:string;
    modelId: string;
    plateNumber: string;
    plateImage: string;
    vehicleImage: string;
    type: string;
    estimatedFare: string;
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
        licenseImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        categoryId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        licenseNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        plateNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        plateImage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        modelId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        vehicleImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        estimatedFare: {
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
        color: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    { timestamps: true, }
)

export default vehicleInfoSchema

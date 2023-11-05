import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type R_dailyDocument = Document & {
    rider: string;
    user: string;
    category: string;
    bookedDays:string;
    pickupLat: string;
    pickupLon: string;
    pickupLocation: string;
    dropLocation:string;
    dropLat:string;
    dropLon:string;
    contactInfo:string;
    instruction:string;
    passengers: string;
    cnicFrontImage:string;
    cnicBackImage:string;
    drivingLicenseFrontImage:string;
    drivingLicenseBackImage:string;
    bidPrice:string;
    status: string;
}


const R_dailySchema = sequelize.define("R_daily",
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
        bookedDays: {
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
        dropLocation: {
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
        contactInfo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        instruction: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        passengers: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cnicFrontImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cnicBackImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        drivingLicenseFrontImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        drivingLicenseBackImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bidPrice: {
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

export default R_dailySchema

import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type RiderDocumentDocument = Document & {
    rider: string;
    cnicFront: string;
    cnicBack: string;
    licenseImage: string;
    licenseNumber: string;
    plateNumber: string;
    plateImage: string;
    status: string;
}


const riderDocumentSchema = sequelize.define("riderDocument",
    {
        rider: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cnicFront: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cnicBack: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        licenseImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        licenseNumber: {
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
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "pending",
        }
    },
    { timestamps: true, }
)

export default riderDocumentSchema

import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type RiderDocumentDocument = Document & {
    rider: string;
    brand: string;
    color: string;
    categoryId: string
    vehicleImage: string;
    cnicFront: string;
    cnicBack: string;
    licenseImage: string;
    licenseNumber: string;
    plateNumber: string;
    plateImage: string;
    modelId: string;
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
       
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "pending",
        }
    },
    { timestamps: true, }
)

export default riderDocumentSchema

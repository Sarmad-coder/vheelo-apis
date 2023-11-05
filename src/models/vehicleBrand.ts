import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type VehicleBrandDocument = Document & {
    brand: string;
    type: string;
    status: string;
}


const VehicleBrandSchema = sequelize.define("vehicleBrands",
    {
        brand: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        type: {
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

export default VehicleBrandSchema

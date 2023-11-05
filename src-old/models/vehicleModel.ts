import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type VehicleModelDocument = Document & {
    brand: string;
    model: string;
    status: string;
}


const VehicleModelSchema = sequelize.define("vehicleModels",
    {
        brand: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        model: {
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

export default VehicleModelSchema

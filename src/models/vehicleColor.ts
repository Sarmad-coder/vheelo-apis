import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type VehicleColorDocument = Document & {
    brand: string;
    model: string;
    color: string;
    status: string;
}


const VehicleColorSchema = sequelize.define("vehicleColors",
    {
        brand: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        color: {
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

export default VehicleColorSchema

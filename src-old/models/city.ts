import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type CityDocument = Document & {
    name: string;
    status: string;
}


const citySchema = sequelize.define("cities",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "enabled",
        },
    },
    { timestamps: true, }
)

export default citySchema

import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type RC_cityDocument = Document & {
    name: string;
    logo: string;
    price: string;
    status: string;
}


const RC_citySchema = sequelize.define("RC_city",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
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

export default RC_citySchema

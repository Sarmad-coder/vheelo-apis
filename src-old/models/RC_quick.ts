import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type RC_quickDocument = Document & {
    name: string;
    logo: string;
    priceKm: string;
    status: string;
}


const RC_quickSchema = sequelize.define("RC_quick",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        priceKm: {
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

export default RC_quickSchema

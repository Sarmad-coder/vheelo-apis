import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type RC_scheduleDocument = Document & {
    name: string;
    logo: string;
    price: string;
    status: string;
}


const RC_scheduleSchema = sequelize.define("RC_schedule",
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

export default RC_scheduleSchema

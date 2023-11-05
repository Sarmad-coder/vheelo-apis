import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type RC_dailyDocument = Document & {
    name: string;
    logo: string;
   price:string;
    status: string;
}


const RC_dailySchema = sequelize.define("RC_daily",
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
            defaultValue: "pending",
        }
    },
    { timestamps: true, }
)

export default RC_dailySchema

import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type SupportDocument = Document & {
    text: string;
    sender: string;
    type: string;
}


const supportSchema = sequelize.define("support",
    {
        text: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sender: {
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

export default supportSchema

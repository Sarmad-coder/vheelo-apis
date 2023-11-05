import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type FAQDocument = Document & {
    question: string;
    answer: string;
    status: string;
}


const FAQSchema = sequelize.define("FAQ",
    {
        question: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        answer: {
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

export default FAQSchema

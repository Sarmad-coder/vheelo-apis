import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type SupportDocument = Document & {
    text: string;
    sender: string;
    senderId: string;
    rider:string;
    user:string;
    sendTo:string;
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
        senderId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sendTo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rider: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user: {
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

import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type WalletUserDocument = Document & {
    user: string;
    balance: string;
    // priceKm: string;
    status: string;
}


const walletUserSchema = sequelize.define("walletUser",
    {
        user: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        balance: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // priceKm: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "pending",
        }
    },
    { timestamps: true, }
)

export default walletUserSchema

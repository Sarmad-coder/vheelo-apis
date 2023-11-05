import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type WalletRiderDocument = Document & {
    rider: string;
    balance: string;
    // priceKm: string;
    status: string;
}


const walletRiderSchema = sequelize.define("walletRider",
    {
        rider: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        balance: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 0,
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

export default walletRiderSchema

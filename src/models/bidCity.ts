import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type BidCityDocument = Document & {
    amount: string;
    rider: string;
    ride: string;
    status: string;
}


const BidCitySchema = sequelize.define("BidCity",
    {
        amount: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rider: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ride: {
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

export default BidCitySchema

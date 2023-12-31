import { Json } from 'sequelize/types/utils';
import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type RiderDocument = Document & {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    fcmToken: string;
    currLat: string;
    currLon: string;
    interCity:string;
    dailyRental:string;
    cityRide:string;
    image: string;
    dob: string;
}


const riderSchema = sequelize.define("riders",
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fcmToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        currLat: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        currLon: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        interCity: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "enable",
        },
        dailyRental: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "enable",
        },
        CityRide: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "enable",
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "available",
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "https://res.cloudinary.com/dpxo0k5hb/image/upload/v1682782197/uploads/1682782196342-Driver%20side-58.png.png"
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "avaliable",
        }
    },
    { timestamps: true, }
)

export default riderSchema

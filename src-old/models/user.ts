import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type UserDocument = Document & {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  fcmToken: string;
  currLat: string;
  currLon: string;
  image: string;
}


const userSchema = sequelize.define("users",
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
      unique: true,
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
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://res.cloudinary.com/dpxo0k5hb/image/upload/v1682782197/uploads/1682782196342-Driver%20side-58.png.png"
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "pending",
    }
  },
  { timestamps: true, }
)

export default userSchema

import { Request, Response, NextFunction } from "express";
import R_CityModel from "../../../models/R_city"
import UserService from "../../../services/user";
import RiderService from "../../../services/rider";

export const getAcceptedRideByRider = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let ride:any=await R_CityModel.findOne({where:{rider: req.params.rider,status:"accepted"}})
      if (ride) {
        let user=await UserService.findById(ride.user)
        return res.json({status:"success",ride,user})
      }else{
        return res.json({status:"error",data:"no ride found"})
      }

    } catch (error) {
        return res.json(error)
    }
}

export const getAcceptedRideByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let ride:any=await R_CityModel.findOne({where:{user: req.params.user,status:"accepted"}})
      if (ride) {
        let rider=await RiderService.findById(ride.rider)
        return res.json({status:"success",ride,rider})
      }else{
        return res.json({status:"error",data:"no ride found"})
      }

    } catch (error) {
        return res.json(error)
    }
}

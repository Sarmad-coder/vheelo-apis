import { Request, Response, NextFunction } from "express";
import { RC_dailyDocument } from '../../../models/RC_daily';
import R_CityService from '../../../models/R_city'
import { BadRequestError, NotFoundError, ValidationError } from '../../../helpers/apiError';
import RiderService from "../../../services/rider";



export const findCompleted = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rides:any = await R_CityService.findAll({where:{status:"completed"}})
        const final: any[] = [];
        for (const ride of rides) {
            const riderData = (await RiderService.findById(ride.rider));
            const userData = (await RiderService.findById(ride.user));
            final.push({ rideData: ride, userData, riderData })
        }
        return res.json({ status: "success", data: final });
    } catch (error) {
        return res.json();
    }
}
export const findCancelled = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rides:any = await R_CityService.findAll({where:{status:"cancelled"}})
        const final: any[] = [];
        for (const ride of rides) {
            const riderData = (await RiderService.findById(ride.dataValues.rider))?.dataValues;
            const userData = (await RiderService.findById(ride.dataValues.user))?.dataValues;
            final.push({ rideData: ride, userData, riderData })
        }
        return res.json({ status: "success", data: final });
    } catch (error) {
        console.log(error);

        return next(new NotFoundError("No records found"));
    }
}
export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params 
         await R_CityService.destroy({where: {id}});
     
        return res.json({ status: "success",message:"Success" });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ status: "fail" });
    }
}
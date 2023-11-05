import { Request, Response, NextFunction } from "express";
import { RiderDocument } from '../../../models/rider';
import VehicleInfoService from "../../../services/vehicleInfo"
export const getvehicaleInfoByRider = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let rider=req.params.rider
        const vehicleInfo = await VehicleInfoService.findOne({ rider });
        if (vehicleInfo != null) {
            return res.json({ status: "success", data: vehicleInfo})
        }else{
            return res.json({ status: "error", data: "No record found"})
        }
    }
    catch (error) {
        return res.json(error)
    }
}

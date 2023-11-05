import { Request, Response, NextFunction } from "express";
import { CityDocument } from '../../../models/city';
import CityService from "../../../services/city"
import { BadRequestError, NotFoundError, ValidationError } from '../../../helpers/apiError';
import { notify } from '../../../util/notification';
import RiderService from "../../../services/rider";



export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const riders = await RiderService.findAll();
        for (const rider of riders) {
            // riderNSP.emit("newRideQuick", rider);
            notify(rider.dataValues.fcmToken, "Test", `Test notifications`)
        }
        notify((await RiderService.findById(1))?.dataValues.fcmToken, "Test", `Test notifications`)
        return res.json({ status: "success", data: await CityService.findAll() });
    } catch (error) {
        return next(new NotFoundError("No records found"));
    }
}

export const findByQuery = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ status: "success", data: await CityService.findByQuery(req.query) })
    } catch (error) {
        return next(new ValidationError("Invalid query", error));
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ status: "success", data: await CityService.findById(req.params.id) })
    } catch (error) {
        return next(new ValidationError("Invalid Id", error));
    }
}

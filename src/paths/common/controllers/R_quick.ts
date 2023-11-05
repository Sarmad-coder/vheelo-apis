import { Request, Response, NextFunction } from "express";
import { CityDocument } from '../../../models/city';
import R_quickService from "../../../services/R_quick"
import UserService from "../../../services/user"
// import RiderService from "../../../services/rider"
import { BadRequestError, NotFoundError, ValidationError } from '../../../helpers/apiError';
import { notify } from '../../../util/notification';
import RiderService from "../../../services/rider";



export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rides = await R_quickService.findAll();
        const final: any[] = [];
        for (const ride of rides) {
            const riderData = (await RiderService.findById(ride.dataValues.rider)).dataValues;
            const userData = (await RiderService.findById(ride.dataValues.user)).dataValues;
            final.push({ rideData: ride, userData, riderData })
        }
        return res.json({ status: "success", data: final });
    } catch (error) {
        return next(new NotFoundError("No records found"));
    }
}

export const findCancelled = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let rides = await R_quickService.findByQuery({ status: "cancelled" });
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

export const findCompleted = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rides:any = await R_quickService.findByQuery({ status: "ended" })
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

export const findPending = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ status: "success", data: await R_quickService.findByQuery({ status: "pending" }) });
    } catch (error) {
        return next(new NotFoundError("No records found"));
    }
}

export const findByQuery = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ status: "success", data: await R_quickService.findByQuery(req.query) })
    } catch (error) {
        return next(new ValidationError("Invalid query", error));
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ status: "success", data: await R_quickService.findById(req.params.id) })
    } catch (error) {
        return next(new ValidationError("Invalid Id", error));
    }
}

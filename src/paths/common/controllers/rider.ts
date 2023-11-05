import { Request, Response, NextFunction } from "express";
import RiderService from "../../../services/rider"
import VehicleInfoService from "../../../services/vehicleInfo"
import { BadRequestError, NotFoundError, ValidationError } from '../../../helpers/apiError';
import rider from "../../../services/rider";

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ status: "success", data: await RiderService.findAll() });
    } catch (error) {
        return next(new NotFoundError("No records found"));
    }
}

export const findByQuery = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ status: "success", data: await RiderService.findByQuery(req.query) })
    } catch (error) {
        return next(new ValidationError("Invalid query", error));
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let riderData = await RiderService.findById(req.params.id)
        let vehicleInfo = await VehicleInfoService.findByQuery({ rider: req.params.id })
        let vehicleInfoObj = vehicleInfo[0]

        return res.json({ status: "success", data: { riderData, vehicleInfo: vehicleInfoObj } })
    } catch (error) {
        return next(new ValidationError("Invalid Id", error));
    }
}
export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data = await RiderService.updateByQuery({ id: req.body.id }, { status: req.body.status })
        res.json({ status: "success", data: await RiderService.findById(req.body.id) })
    } catch (error) {
        return res.json({ status: "Invalid Id", error });
    }
}
export const updateState = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let id = req.body.id
        delete req.body.id
        if (req.body.interCity) {
            let data = await RiderService.updateByQuery({ id: id }, { interCity: req.body.interCity })
            res.json({ status: "success", data: await RiderService.findById(id) })
        }else if(req.body.CityRide){
            let data = await RiderService.updateByQuery({ "id": id }, { CityRide: req.body.CityRide })
            res.json({ status: "success", data: await RiderService.findById(id) })
        }else{
            let data = await RiderService.updateByQuery({ "id": id }, { dailyRental: req.body.dailyRental })
            res.json({ status: "success", data: await RiderService.findById(id) })
        }

    } catch (error) {
        return res.json(error);
    }
}

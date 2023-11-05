import { Request, Response, NextFunction } from "express";
import { VehicleBrandDocument } from '../../../models/vehicleBrand';
import VehicleBrandService from "../../../services/vehicleBrand"
import { BadRequestError, NotFoundError, ValidationError } from '../../../helpers/apiError';


export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ status: "success", data: await VehicleBrandService.findAll() });
    } catch (error) {
        return next(new NotFoundError("No records found"));
    }
}


export const findByQuery = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ status: "success", data: await VehicleBrandService.findByQuery(req.query) })
    } catch (error) {
        return next(new ValidationError("Invalid query", error));
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ status: "success", data: await VehicleBrandService.findById(req.params.id) })
    } catch (error) {
        return next(new ValidationError("Invalid Id", error));
    }
}

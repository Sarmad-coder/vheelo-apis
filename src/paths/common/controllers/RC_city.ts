import { Request, Response, NextFunction } from "express";
import { CityDocument } from '../../../models/city';
import CityService from "../../../models/RC_city"
import { BadRequestError, NotFoundError, ValidationError } from '../../../helpers/apiError';
import { notify } from '../../../util/notification';
import RiderService from "../../../services/rider";
import { where } from "sequelize";



export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data=await CityService.create(req.body) 
        return res.json({ status: "success", data});
    } catch (error) {
        return next(new NotFoundError("someThing went wrong"));
    }
}

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ status: "success", data: await CityService.findAll() });
    } catch (error) {
        return next(new NotFoundError("No records found"));
    }
}

export const findByQuery = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ status: "success", data: await CityService.findAll({ where: req.query})})
    } catch (error) {
        return next(new ValidationError("Invalid query", error));
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id:any=req.params.id
        return res.json({ status: "success", data: await CityService.findOne({ where: { id } }) })
    } catch (error) {
        return next(new ValidationError("Invalid Id", error));
    }
}

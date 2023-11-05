import { Request, Response, NextFunction } from "express";
import { RC_quickDocument } from '../../../models/RC_quick';
import Rc_HourlyService from "../../../services/RC_hourly"
import { BadRequestError, NotFoundError, ValidationError } from '../../../helpers/apiError';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ status: "success", data: await Rc_HourlyService.findAll() });
    } catch (error) {
        return res.json(error);
    }
}

export const findByQuery = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ status: "success", data: await Rc_HourlyService.findByQuery(req.query) })
    } catch (error) {
        return res.json(error);
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ status: "success", data: await Rc_HourlyService.findById(req.params.id) })
    } catch (error) {
        return res.json(error);
    }
}

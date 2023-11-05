import { Request, Response, NextFunction } from "express";
import { RC_quickDocument } from '../../../models/RC_quick';
import Rc_QuickService from "../../../services/RC_quick"
import { BadRequestError, NotFoundError, ValidationError } from '../../../helpers/apiError';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ status: "success", data: await Rc_QuickService.findAll() });
    } catch (error) {
        return next(new NotFoundError("No records found"));
    }
}

export const findByQuery = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ status: "success", data: await Rc_QuickService.findByQuery(req.query) })
    } catch (error) {
        return next(new ValidationError("Invalid query", error));
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ status: "success", data: await Rc_QuickService.findById(req.params.id) })
    } catch (error) {
        return next(new ValidationError("Invalid Id", error));
    }
}

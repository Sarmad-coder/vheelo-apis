import { Request, Response, NextFunction } from "express";
import SupportService from "../../../services/support"
import { BadRequestError, NotFoundError, ValidationError } from '../../../helpers/apiError';
// exporting common controllers
import { findAll, findById, findByQuery, personChat, deleteChat, deleteOne } from '../../common/controllers/support';
export { findAll, findById, findByQuery, personChat, deleteChat, deleteOne };


export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await SupportService.create({ ...req["validData"], type: "admin" });
        return res.json({ status: "success", data });
    } catch (error) {
        return next(new ValidationError("Invalid parameters"));
    }
}

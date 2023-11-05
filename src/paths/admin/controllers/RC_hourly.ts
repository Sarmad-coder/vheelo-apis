import { Request, Response, NextFunction } from "express";
import { RC_dailyDocument } from '../../../models/RC_daily';
import Rc_QuickService from "../../../services/RC_hourly"
import { BadRequestError, NotFoundError, ValidationError } from '../../../helpers/apiError';
// exporting common controllers
import { findAll, findById, findByQuery } from "../../common/controllers/RC_daily";
export { findAll, findById, findByQuery };


export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body as RC_dailyDocument;
        const old = await Rc_QuickService.findOne({ name });
        if (old != null) {
            return res.json("This name already exists");
        }
        const data = await Rc_QuickService.create(req["validData"]);
        return res.json({ status: "success", data });
    } catch (error) {
        return next(new ValidationError("Invalid fields: " + JSON.stringify(error)));
    }
}

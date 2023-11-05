import { Request, Response, NextFunction } from "express";
import { VehicleColorDocument } from '../../../models/vehicleColor';
import VehicleColorService from "../../../services/vehicleColor";
import { BadRequestError, NotFoundError, ValidationError } from '../../../helpers/apiError';
// exporting common controllers
import { findAll, findById, findByQuery } from "../../common/controllers/vehicleColor";
export { findAll, findById, findByQuery };


export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { color, model } = req.body as VehicleColorDocument;
        const old = await VehicleColorService.findOne({ color, model });
        if (old != null) {
            return next(new BadRequestError("This color already exists for this model"));
        }
        const data = await VehicleColorService.create(req["validData"]);
        return res.json({ status: "success", data });
    } catch (error) {
        return next(new ValidationError("Invalid fields: " + JSON.stringify(error)));
    }
}

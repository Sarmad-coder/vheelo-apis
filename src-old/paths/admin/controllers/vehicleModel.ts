import { Request, Response, NextFunction } from "express";
import { VehicleModelDocument } from '../../../models/vehicleModel';
import VehicleModelService from "../../../services/vehicleModel";
import { BadRequestError, NotFoundError, ValidationError } from '../../../helpers/apiError';
// exporting common controllers
import { findAll, findById, findByQuery } from "../../common/controllers/vehicleModel";
export { findAll, findById, findByQuery };


export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { brand, model } = req.body as VehicleModelDocument;
        const old = await VehicleModelService.findOne({ brand, model });
        if (old != null) {
            return next(new BadRequestError("This model already exists for this brand"));
        }
        const data = await VehicleModelService.create(req["validData"]);
        return res.json({ status: "success", data });
    } catch (error) {
        return next(new ValidationError("Invalid fields: " + JSON.stringify(error)));
    }
}

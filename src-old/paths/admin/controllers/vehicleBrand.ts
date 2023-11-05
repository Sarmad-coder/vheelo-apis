import { Request, Response, NextFunction } from "express";
import { VehicleBrandDocument } from '../../../models/vehicleBrand';
import VehicleBrandService from "../../../services/vehicleBrand"
import { BadRequestError, NotFoundError, ValidationError } from '../../../helpers/apiError';
// exporting common controllers
import { findAll, findById, findByQuery } from "../../common/controllers/vehicleBrand";
export { findAll, findById, findByQuery };

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { brand } = req.body as VehicleBrandDocument;
        const old = await VehicleBrandService.findOne({ brand });
        if (old != null) {
            return next(new BadRequestError("This brand already exists"));
        }
        const data = await VehicleBrandService.create(req["validData"]);
        return res.json({ status: "success", data });
    } catch (error) {
        return next(new ValidationError("Invalid fields: " + JSON.stringify(error)));
    }
}

import { Request, Response, NextFunction } from "express";
import { CityDocument } from '../../../models/city';
import CityService from "../../../services/city"
import { BadRequestError, NotFoundError, ValidationError } from '../../../helpers/apiError';
// exporting common controllers
import { findAll, findById, findByQuery } from "../../common/controllers/city";
export { findAll, findById, findByQuery };

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body as CityDocument;
        const old = await CityService.findOne({ name });
        if (old != null) {
            return next(new BadRequestError("This name already exists"));
        }
        const data = await CityService.create(req["validData"]);
        return res.json({ status: "success", data });
    } catch (error) {
        return next(new ValidationError("Invalid fields: " + JSON.stringify(error)));
    }
}

// api controller function to delete a city
export const deleteCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await CityService.deleteById(req.params.id);
        return res.json({ status: "success", data: "Deleted" });
    } catch (error) {
        return next(new ValidationError("Invalid Id", error));
    }
}

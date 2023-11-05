import { Request, Response, NextFunction } from "express";
import R_quickService from "../../../services/R_quick"
import { BadRequestError, NotFoundError, ValidationError } from '../../../helpers/apiError';
import { R_quickDocument } from '../../../models/R_quick';


// export const cancelRides = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { phone } = req.body as UserDocument;
//         const old = await UserService.findOne({ phone });
//         if (old != null) {
//             return next(new BadRequestError("This phone already exists"));
//         }
//         const data = await UserService.create(req["validData"]);
//         return res.json({ status: "success", data });
//     } catch (error) {
//         console.log(error.message);

//         return next(new ValidationError("Invalid fields: " + JSON.stringify(error)));
//     }
// }


export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { rideId } = req.body;
        const data = await R_quickService.findById(rideId);
        return res.json({ status: "success", data });
    } catch (error) {
        next(new ValidationError("Invalid fields: " + JSON.stringify(error)));
    }
}

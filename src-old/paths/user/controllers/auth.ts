import { Request, Response, NextFunction } from "express";
import UserService from "../../../services/user"
import { BadRequestError, NotFoundError, ValidationError } from '../../../helpers/apiError';
import { UserDocument } from '../../../models/user';


export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone } = req.body as UserDocument;
        const old = await UserService.findOne({ phone });
        if (old != null) {
            return next(new BadRequestError("This phone already exists"));
        }
        const data = await UserService.create(req["validData"]);
        return res.json({ status: "success", data });
    } catch (error) {
        console.log(error.message);

        return next(new ValidationError("Invalid fields: " + JSON.stringify(error)));
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone } = req.body;
        const data = await UserService.findOne({ phone });
        if (data == null) {
            return next(new NotFoundError("No records found"));
        }
        return res.json({ status: "success", data })
    } catch (error) {
        return next(new ValidationError("Invalid phone number or password", error));
    }
}

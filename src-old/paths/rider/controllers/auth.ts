import { Request, Response, NextFunction } from "express";
import RiderService from "../../../services/rider"
import { BadRequestError, NotFoundError, ValidationError } from '../../../helpers/apiError';
import { RiderDocument } from '../../../models/rider';
import RiderDocumentService from "../../../services/riderDocument"
import VehicleInfoService from "../../../services/vehicleInfo"

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone } = req.body as RiderDocument;
        const old = await RiderService.findOne({ phone });
        if (old != null) {
            return next(new BadRequestError("This phone already exists"));
        }
        const data = await RiderService.create(req["validData"]);
        return res.json({ status: "success", data });
    } catch (error) {
        return next(new ValidationError("Invalid fields: " + JSON.stringify(error)));
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone } = req.body;
        const data = await RiderService.findOne({ phone });
        if (data == null) {
            return next(new NotFoundError("No records found"));
        }
        const { phone: phoneNum, ...others } = req["validData"]
        await RiderService.updateByQuery({ phone }, others)
        return res.json({ status: "success", data })
    } catch (error) {
        return next(new ValidationError("Invalid phone number or password", error));
    }
}

export const documents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { rider } = req.body;
        const old = await RiderDocumentService.findOne({ rider });
        if (old != null) {
            await RiderDocumentService.updateByFilter({ rider }, { ...req["validData"] });
            return res.json({ status: "success", data: await RiderDocumentService.findOne({ rider }) })
        }
        const data = await RiderDocumentService.create(req["validData"]);
        return res.json({ status: "success", data })
    }
    catch (error) {
        return next(new ValidationError("Invalid fields", error))
    }
}

export const vehicleInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { rider } = req.body;
        const old = await VehicleInfoService.findOne({ rider });
        if (old != null) {
            return res.json({ status: "success", data: await VehicleInfoService.findOne({ rider }) })
        }
        const data = await VehicleInfoService.create(req["validData"]);
    } catch (error) {
        return next(new ValidationError("Invalid fields", error))
    }
}


export const uploadFunc = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filePath = req.file.path;
        if (filePath == undefined) {
            return next(new BadRequestError("No file received"));
        }
        return res.json({ status: "success", data: filePath })
    } catch (error) {
        return next(new BadRequestError("No file received"))
    }
}

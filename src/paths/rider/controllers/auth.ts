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
            return res.json({ message: "This Phone Number is Already Registered", });
        } else {
            const data = await RiderService.create(req["validData"]);
            return res.json({ status: "success", data });
        }

    } catch (error) {
        return next(new ValidationError("Invalid fields: " + JSON.stringify(error)));
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone } = req.body;
        const data = await RiderService.findOne({ phone });
        if (data == null) {
            return res.json(("No records found"));
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
        const old = await RiderService.findOne({ "id": rider });
        if (old != null) {
            const data = await VehicleInfoService.create(req.body);
            return res.json({ status: "success", data: await VehicleInfoService.findOne({ rider }) })
        } else {
            res.json("Rider is not registered")
        }

    } catch (error) {
        return next(new ValidationError("Invalid fields", error))
    }
}

export const checkRider = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let rider = req.params.rider
        const rider1 = await RiderService.findById(rider)
        const vehicleInfo = await VehicleInfoService.findOne({ rider });
        const riderDocument = await RiderDocumentService.findOne({ rider });
        let data = { rider: false, vehicleInfo: false, riderDocument: false }
        if (rider1) {
            data.rider = true
        }
        if (vehicleInfo) {
            data.vehicleInfo = true
        }
        if (riderDocument) {
            data.riderDocument = true
        }
        res.json({status:"success",data})
    } catch (error) {
        return next(new ValidationError("Invalid fields", error))
    }
}


export const uploadFunc = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let filePath: string;

        if (Array.isArray(req.files)) {
            // If req.files is of type FileArray, access the 'name' property directly
            filePath = process.env.APIROUTE + ":" + process.env.PORT + "/" + req.files[0].originalname;
        } else {
            // If req.files is of type { [fieldname: string]: FileArray }, access the 'name' property using the field name
            filePath = process.env.APIROUTE + ":" + process.env.PORT + "/" + req.files.file[0].originalname;
        }
        if (filePath == undefined) {
            return next(new BadRequestError("No file received"));
        }
        return res.json({ status: "success", data: filePath })
    } catch (error) {
        return next(new BadRequestError("No file received"))
    }
}

import { Request, Response, NextFunction } from "express";
import { RiderDocument } from '../../../models/rider';
import RiderDocumentService from "../../../services/riderDocument"
export const getDocumentsByRider = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let rider=req.params.rider
        const riderDocument = await RiderDocumentService.findOne({ rider });
        if (riderDocument != null) {
            return res.json({ status: "success", data: riderDocument})
        }else{
            return res.json({ status: "error", data: "No record found"})
        }
    }
    catch (error) {
        return res.json(error)
    }
}

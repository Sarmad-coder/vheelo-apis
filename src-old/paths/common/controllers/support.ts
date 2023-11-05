import { Request, Response, NextFunction } from "express";
import { SupportDocument } from '../../../models/support';
import SupportService from "../../../services/support"
import { BadRequestError, NotFoundError, ValidationError } from '../../../helpers/apiError';


export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ status: "success", data: await SupportService.findAll() });
    } catch (error) {
        return next(new NotFoundError("No records found"));
    }
}

export const findByQuery = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ status: "success", data: await SupportService.findByQuery(req.query) })
    } catch (error) {
        return next(new ValidationError("Invalid query", error));
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({ status: "success", data: await SupportService.findById(req.params.id) })
    } catch (error) {
        return next(new ValidationError("Invalid Id", error));
    }
}

export const personChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { sender } = req.body;
        const data = await SupportService.findByQuery({ sender });
        return res.json({ status: "success", data })
    } catch (error) {
        return next(new NotFoundError("No record found", error))
    }
}

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;
        await SupportService.deleteById(id);
        return res.json({ status: "success" });
    } catch (error) {
        return next(new ValidationError("Invalid ID"));
    }
}

export const deleteChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { sender } = req.body;
        await SupportService.deleteRecords({ sender });
        return res.json({ status: "success" });
    } catch (error) {
        return next(new ValidationError("Invalid ID"));
    }
}

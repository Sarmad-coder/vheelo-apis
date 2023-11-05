import express, { Request, Response, NextFunction } from "express";
import UserService from "../../../services/user";
import { NotFoundError } from "../../../helpers/apiError";


export async function findAll(req: Request, res: Response | any, next: NextFunction) {
    try {
        // console.log("hi");
        return res.json({ status: "success", data: await UserService.findAll() })
    } catch (error) {
        return next(new NotFoundError("No Record Found", error))
    }
}

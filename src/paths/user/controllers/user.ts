import express, { Request, Response, NextFunction } from "express";
import UserService from "../../../services/user";
import { NotFoundError } from "../../../helpers/apiError";
import userSchema from "../../../models/user";
import R_dailyModel from "../../../models/R_daily";
import R_quickService from "../../../services/R_quick"
import R_CityModel from "../../../models/R_city"
import R_scheduleModel from "../../../models/R_schedule";


export async function findAll(req: Request, res: Response | any, next: NextFunction) {
    try {
        // console.log("hi");
        return res.json({ status: "success", data: await UserService.findAll() })
    } catch (error) {
        return next(new NotFoundError("No Record Found", error))
    }
}
export async function findById(req: Request, res: Response | any, next: NextFunction) {
    try {
        // console.log("hi");
        return res.json({ status: "success", data: await UserService.findById(req.params.id) })
    } catch (error) {
        return next(new NotFoundError("No Record Found", error))
    }
}
export const getHistoryByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const R_quick = await R_quickService.findByQuery({user:req.params.id});
        const R_dialy = await R_dailyModel.findAll({where:{user:req.params.id}});
        const R_City = await R_CityModel.findAll({where:{user:req.params.id}});
        const R_schedule = await R_scheduleModel.findAll({where:{user:req.params.id}});
        return res.json({status:"success",data:{R_quick,R_dialy,R_City,R_schedule}})
    }
    catch (error) {
        return res.json(error)
    }
}
export const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
        
        const { id } = req.params 
         const data = await userSchema.update({...req.body},{where: {id}});
     
        return res.json({ status: "success",data });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ status: "fail" });
    }
}
export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
        
        const { id } = req.params 
         await userSchema.destroy({where: {id}});
     
        return res.json({ status: "success",message:"Success" });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ status: "fail" });
    }
}

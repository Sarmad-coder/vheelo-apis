import { Request, Response, NextFunction } from "express";
import R_dailyModel from "../../../models/R_daily";
import riderSchema from "../../../models/rider";
import R_quickService from "../../../services/R_quick"
import R_quickModel from "../../../models/R_quick"
import R_CityModel from "../../../models/R_city"
import R_scheduleModel from "../../../models/R_schedule";
import User from "../../../models/user";
import Rider from "../../../models/rider";
import RiderService from "../../../services/rider"
import { findAll, findById, findByQuery,updateStatus,updateState } from "../../common/controllers/rider"
export { findAll, findById, findByQuery,updateStatus,updateState }
export const getHistoryByRider = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const R_quick = await R_quickService.findByQuery({rider:req.params.id});
        const R_dialy = await R_dailyModel.findAll({where:{rider:req.params.id}});
        const R_City = await R_CityModel.findAll({where:{rider:req.params.id}});
        const R_schedule = await R_scheduleModel.findAll({where:{rider:req.params.id}});
        return res.json({status:"success",data:{R_quick,R_dialy,R_City,R_schedule}})
    }
    catch (error) {
        return res.json(error)
    }
}
export const review = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let id=req.body.id
        delete req.body.id
        // delete req.body.userID
       let rating= await R_quickModel.update(req.body,{where:{id:id}})
       let rider1=await R_quickModel.findOne({where:{id:id}})
       console.log(rider1)
        return res.json({status:"success"})
    }
    catch (error) {
        return res.json(error)
    }
}
export const getReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // let riderid=+ req.params.rider
        let reviews=await R_quickModel.findAll({
            include: [
                {
                    model: User,
                    as: 'ridesu'
                }
            ],
            where:{rider:req.params.rider
            }})
        return res.json({status:"success",reviews})
    }
    catch (error) {
        return res.json(error)
    }
}
export const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
        
        const { id } = req.params 
         const data = await riderSchema.update({...req.body},{where: {id}});
     
        return res.json({ status: "success",data });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ status: "fail" });
    }
}
export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
        
        const { id } = req.params 
         await riderSchema.destroy({where: {id}});
     
        return res.json({ status: "success",message:"Success" });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ status: "fail" });
    }
}
export const getAllReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
       
        let reviews=await R_quickModel.findAll({
            include: [
                {
                    model: Rider,
                    as: 'ars'
                },
                {
                    model: User,
                    as: 'ridesu'
                },
              
            ],
          
        })

     
        return res.json({status:"success",reviews})
    }
    catch (error) {
        return res.json(error)
    }
}
export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data=await R_quickModel.create({...req.body})
     
        return res.json({status:"success",data})
    }
    catch (error) {
        return res.json(error)
    }
}
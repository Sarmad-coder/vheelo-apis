import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotFoundError, ValidationError } from '../../../helpers/apiError';
import { notify } from '../../../util/notification';
import RiderService from "../../../services/rider"
// exporting common controllers


export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
let riders:any=await RiderService.findAll()
riders.forEach(element => {
    notify(element.fcmToken, req.body.title, req.body.body)
});
return res.json({status:"success"})
    //     let FAQ=await FAQModel.create(req.body)

    
    } catch (error) {
        return res.json({status:"error",data:error});
    }
}

// api controller function to delete a city
// export const deleteFAQ = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         await FAQModel.destroy({where:{id:req.params.id}});
//         return res.json({ status: "success", data: "Deleted" });
//     } catch (error) {
//         return res.json({status:"error",data:error});
//     }
// }
// export const getAll = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//        let FAQs= await FAQModel.findAll();
//         return res.json({ status: "success", FAQs });
//     } catch (error) {
//         return res.json({status:"error",data:error});
//     }
// }
// export const getById = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         let FAQ=await FAQModel.findOne({where:{id:req.params.id}});
//         return res.json({ status: "success", FAQ });
//     } catch (error) {
//         return res.json({status:"error",data:error});
//     }
// }
// export const updateById = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         let id=req.body.id
//         delete req.body.id
//         await FAQModel.update(req.body,{where:{id:id}});
//         return res.json({ status: "success", data:await FAQModel.findOne({where:{id:id}}) });
//     } catch (error) {
//         return res.json({status:"error",data:error});
//     }
// }

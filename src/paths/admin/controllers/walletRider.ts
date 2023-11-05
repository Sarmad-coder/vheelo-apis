import { Request, Response, NextFunction } from "express";
import WalletModel from "../../../models/walletRider"
import { BadRequestError, NotFoundError, ValidationError } from '../../../helpers/apiError';
// exporting common controllers


export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const old = await WalletModel.findOne({ where:{rider:req.body.rider} });
        if (old != null) {
            const data = await WalletModel.update(req.body,{where:{rider:req.body.rider}})
            return res.json({ status: "success", data });
        }
        const data = await WalletModel.create(req.body);
        return res.json({ status: "success", data });
    } catch (error) {
        return next(new ValidationError("Invalid fields: " + JSON.stringify(error)));
    }
}

export const getByRider = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const riderWallet = await WalletModel.findOne({ where:{rider:req.params.rider} });
if (riderWallet) {
    return res.json({status:"success",riderWallet})
}else{
    return res.json({status:"error",data:"No wallet is created"})
}

    } catch (error) {
        return next(new ValidationError("Invalid fields: " + JSON.stringify(error)));
    }
}

// api controller function to delete a city


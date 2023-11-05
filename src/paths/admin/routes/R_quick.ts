import express, { Request, Response, NextFunction } from "express";
import { validateInputs } from "../../../middlewares/validate"
import R_quickSchema from '../../../models/R_quick'
import { findAll, findById, findByQuery, findCancelled, findCompleted } from "../controllers/R_quick";
const router = express.Router();



router.get("/getAll", findAll);
router.get("/getByQuery", findByQuery);
router.get("/getCancelled", findCancelled);
router.get("/getCompleted", findCompleted);
router.get("/getById/:id", findById);
router.delete("/deleteById/:id", async(req,res)=>{
    try {
        const { id } = req.params 
         await R_quickSchema.destroy({where: {id}});
     
        return res.json({ status: "success",message:"Success" });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ status: "fail" });
    }
});

export default router;

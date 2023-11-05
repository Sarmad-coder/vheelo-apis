import express, { Request, Response, NextFunction } from "express";
import { validateInputs } from "../../../middlewares/validate"
import { create, findAll, findById, findByQuery,deleteById } from "../controllers/vehicleColor";
const router = express.Router();


router.post("/add", validateInputs(["brand", "model", "color"]), create);

router.get("/getAll", findAll);
router.get("/getByQuery", findByQuery);
router.get("/getById/:id", findById);
router.delete('/deleteById/:id',deleteById)
router.get('/a',async(req,res)=>{
    res.json('hello')
})
export default router;

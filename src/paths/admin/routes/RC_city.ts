import express, { Request, Response, NextFunction } from "express";
import { validateInputs } from "../../../middlewares/validate"
import { create, findAll, findById, findByQuery } from "../controllers/Rc_city";
const router = express.Router();


router.post("/create", create);

router.get("/getAll", findAll);
router.get("/getByQuery", findByQuery);
router.get("/getById/:id", findById);

export default router;

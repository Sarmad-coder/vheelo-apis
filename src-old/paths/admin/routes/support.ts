import express, { Request, Response, NextFunction } from "express";
import { validateInputs } from "../../../middlewares/validate"
import { findAll, findById, findByQuery, deleteChat, deleteOne, create } from "../controllers/support";
import { SupportDocument } from '../../../models/support';

const router = express.Router();


router.post("/add", validateInputs(["text", "sender"]), create);

router.get("/getAll", findAll);
router.get("/getByQuery", findByQuery);
router.get("/getById/:id", findById);
router.post("/deleteOne", deleteOne);
router.post("/deleteChat", deleteChat);

export default router;

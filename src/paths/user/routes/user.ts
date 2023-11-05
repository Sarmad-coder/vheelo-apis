import express from "express";
const router = express.Router();

import { findAll,getHistoryByUser,findById,updateById,deleteById } from "../controllers/user"

router.get("/", findAll);
router.get("/getById/:id", findById);
router.get("/getHistory/:id", getHistoryByUser);
router.put("/updateById/:id", updateById);
router.delete("/deleteById/:id", deleteById);


export default router;

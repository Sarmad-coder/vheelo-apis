import express, { Request, Response, NextFunction } from "express";
import {  create,findAll,getAllReviews,deleteById, findById, findByQuery,updateStatus,getHistoryByRider,updateState,review,getReviews } from "../controllers/rider";
import { validateInputs } from "../../../middlewares/validate";
const router = express.Router();


router.post("/updateStatus", updateStatus);
router.post("/giveReview", review);
router.put("/updateState", updateState);
router.get("/getAll", findAll);
router.get("/getHistory/:id", getHistoryByRider);
router.get("/getByQuery", findByQuery);
router.get("/getById/:id", findById);
router.get("/getReviews/:rider", getReviews);
router.get("/allReviews", getAllReviews);
// router.post("/create", create);

router.delete("/deleteById/:id", deleteById);
export default router;

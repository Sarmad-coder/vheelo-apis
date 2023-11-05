import express from "express";

const router = express.Router();
import { validateInputs } from "../../../middlewares/validate"
import { getAcceptedRideByRider,getAcceptedRideByUser } from "../controllers/R_city"


router.get("/getAcceptedRideByRider/:rider", getAcceptedRideByRider);
router.get("/getAcceptedRideByUser/:user", getAcceptedRideByUser);




export default router;

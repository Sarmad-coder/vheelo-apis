import express from "express";

const router = express.Router();
import { getvehicaleInfoByRider } from "../controllers/vehicleInfo"

router.get("/getvehicaleInfoByRider/:rider", getvehicaleInfoByRider);
export default router;
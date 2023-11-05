import express from "express";

const router = express.Router();
import { getDocumentsByRider } from "../controllers/riderDocument"

router.get("/getDocumentsByRider/:rider", getDocumentsByRider);
export default router;
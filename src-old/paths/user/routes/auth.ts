import express from "express";

const router = express.Router();
import { validateInputs } from "../../../middlewares/validate"
import { login, create } from "../controllers/auth"
import { upload } from '../../../util/upload';

router.post("/login", validateInputs(["phone", "fcmToken", "currLat", "currLon"]), login);

router.post("/register", validateInputs(["firstName", "lastName", "phone", "email", "fcmToken", "currLat", "currLon"]), create);



export default router;

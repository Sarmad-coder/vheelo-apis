import express from "express";

const router = express.Router();
import { validateInputs } from "../../../middlewares/validate"
import { login, create, documents, vehicleInfo, uploadFunc, checkRider } from "../controllers/auth"
import { upload } from '../../../util/upload';

router.post("/upload", upload.fields([
    { name: 'file', maxCount: 1 },
  ]), uploadFunc);


router.post("/login", validateInputs(["phone", "fcmToken", "currLat", "currLon"]), login);

router.post("/register", validateInputs(["firstName", "lastName", "phone", "email", "fcmToken", "currLat", "currLon", "image", "dob", "city"]), create);

// router.post("/documents", validateInputs(["rider", "plateNumber", "plateImage", "status"]), documents);

router.post("/license", validateInputs(["rider", "licenseImage", "licenseNumber",]), documents);

router.post("/cnic", validateInputs(["rider", "cnicFront", "cnicBack"]), documents);
router.get("/checkRider/:rider", checkRider);

router.post("/vehicleInfo", validateInputs(["rider","plateNumber", "plateImage", "vehicleImage", "cardFront", "cardBack"]), vehicleInfo);

export default router;

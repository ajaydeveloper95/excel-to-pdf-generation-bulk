import express from "express";
import { storeData, generatePdf, generateZIP } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/storeData", storeData);
router.get("/generatePdf", generatePdf);
router.get("/generateZIP", generateZIP);

export default router;
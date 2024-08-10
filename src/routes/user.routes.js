import express from "express";
import { storeData, generatePdf } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/storeData", storeData);
router.get("/generatePdf", generatePdf);

export default router;
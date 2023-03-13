import express from "express";
import { getRecommendations, putAcceptRecommendations, putRejectRecommendations } from "../controllers/client.js";

const router = express.Router();

router.get("/", getRecommendations);
router.put("/:id/accept", putAcceptRecommendations);
router.put("/:id/reject", putRejectRecommendations);
export default router;

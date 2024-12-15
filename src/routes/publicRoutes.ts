import express from "express";
import { getAdminBasicDetails, getTechKnowledgeAndWorkExperience, getAllPortfolios, fetchReviewServiceVideoData } from "../controllers/publicController";

const router = express.Router();

// Define the route to fetch admin details
router.get("/admin-details", getAdminBasicDetails);

// Define the route to fetch tech knowledge and work experience details
router.get("/tech-work-experience", getTechKnowledgeAndWorkExperience);

// Define the route to fetch all portfolios with images
router.get("/portfolios", getAllPortfolios);

// Define the route to fetch services, videos, and client reviews
router.get("/clientReview-service-video", fetchReviewServiceVideoData);


export default router;


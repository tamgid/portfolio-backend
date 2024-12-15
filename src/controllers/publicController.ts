import { Request, Response, NextFunction } from "express";
import { fetchAllAdminDetails, fetchTechKnowledgeAndWorkExperience, fetchAllPortfolios, fetchServicesVideosAndClientReviews } from "../models/publicModel";

// Controller to handle the GET request for admin details
export const getAdminBasicDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch data from the model
    const { adminDetails, adminAbout, adminImages } = await fetchAllAdminDetails();

    // Send response with data categorized by table names
    res.status(200).json({
      success: true,
      data: [
        { heading: "admin", content: adminDetails },
        { heading: "admin_about", content: adminAbout },
        { heading: "admin_image", content: adminImages },
      ],
    });
  } catch (error) {
    console.error("Error fetching admin details:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching admin details.",
    });
  }
};


// Controller to handle the GET request for tech knowledge and work experience
export const getTechKnowledgeAndWorkExperience = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Fetch data from the model
      const { techKnowledge, workExperience } = await fetchTechKnowledgeAndWorkExperience();
  
      // Send response with data categorized by table names
      res.status(200).json({
        success: true,
        data: [
          { heading: "tech_knowledge", content: techKnowledge },
          { heading: "work_experience", content: workExperience },
        ],
      });
    } catch (error) {
      console.error("Error fetching tech knowledge and work experience:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching tech knowledge and work experience.",
      });
    }
  };

// Controller function to handle the GET request
export const getAllPortfolios = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch all portfolios with images from the model
    const portfolios = await fetchAllPortfolios();

    // Send a successful response with the data
    res.status(200).json({
      success: true,
      data: portfolios,
    });
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching portfolios.",
    });
  }
};


// Controller to handle the GET request for services, videos, and client reviews
export const fetchReviewServiceVideoData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch data from the model
    const { services, videos, clientReviews } = await fetchServicesVideosAndClientReviews();
  
    // Send response with data categorized by table names
    res.status(200).json({
      success: true,
      data: [
        { heading: "service", content: services },
        { heading: "video", content: videos },
        { heading: "client_review", content: clientReviews },
      ],
    });
  } catch (error) {
    console.error("Error fetching services, videos, and client reviews:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching services, videos, and client reviews.",
    });
  }
};



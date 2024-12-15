import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch all admin details, admin_about, and admin_image data
export const fetchAllAdminDetails = async () => {
  // Fetch admin details
  const adminDetails = await prisma.admin.findMany();

  // Fetch admin_about details
  const adminAbout = await prisma.admin_about.findMany();

  // Fetch admin_image details
  const adminImages = await prisma.admin_image.findMany();

  return {
    adminDetails, // Admin basic information
    adminAbout,   // Admin about information
    adminImages,  // Admin images
  };
};


// Fetch tech knowledge and work experience details
export const fetchTechKnowledgeAndWorkExperience = async () => {
    // Fetch tech knowledge details
    const techKnowledge = await prisma.tech_knowledge.findMany();
  
    // Fetch work experience details
    const workExperience = await prisma.work_experience.findMany();
  
    return {
      techKnowledge,     // Tech knowledge details
      workExperience,    // Work experience details
    };
  };


// Fetch all portfolios along with their related images using Prisma's 'include' feature
export const fetchAllPortfolios = async () => {
  try {
    const portfoliosWithImages = await prisma.portfolio.findMany({
      include: {
        portfolio_image: true, // Include the related images
      },
    });

    return portfoliosWithImages; // Return the portfolios with images
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    throw new Error("Failed to fetch portfolios and images.");
  }
};


// Fetch services, videos, and client reviews
export const fetchServicesVideosAndClientReviews = async () => {
  try {
    // Fetch service details
    const services = await prisma.service.findMany();

    // Fetch video details
    const videos = await prisma.video.findMany();

    // Fetch client review details
    const clientReviews = await prisma.client_review.findMany();

    return {
      services,      // Service details
      videos,        // Video details
      clientReviews, // Client review details
    };
  } catch (error) {
    console.error("Error fetching services, videos, and client reviews:", error);
    throw new Error("Failed to fetch services, videos, and client reviews.");
  }
};

  



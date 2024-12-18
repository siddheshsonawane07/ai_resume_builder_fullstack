const { PrismaClient } = require('@prisma/client'); // Assuming you're using Prisma ORM
// If you're using a different ORM, adjust the implementation accordingly

const prisma = new PrismaClient();

class ResumeController {
    // Create a new resume
    static async createResume(resumeData) {
        try {
            const newResume = await prisma.userResume.create({
                data: resumeData
            });
            return newResume;
        } catch (error) {
            console.error('Error creating resume:', error);
            throw error;
        }
    }

    // Get resumes for a specific user email
    static async getUserResumes(userEmail) {
        try {
            const userResumes = await prisma.userResume.findMany({
                where: {
                    userEmail: userEmail
                }
            });
            return userResumes;
        } catch (error) {
            console.error('Error fetching user resumes:', error);
            throw error;
        }
    }

    // Update resume details
    static async updateResume(id, updateData) {
        try {
            const updatedResume = await prisma.userResume.update({
                where: { id: parseInt(id) },
                data: updateData
            });
            return updatedResume;
        } catch (error) {
            console.error('Error updating resume:', error);
            throw error;
        }
    }

    // Get resume by ID with population
    static async getResumeById(id) {
        try {
            const resume = await prisma.userResume.findUnique({
                where: { id: parseInt(id) },
                // Add include for relations if needed
                // include: { 
                //     someRelation: true 
                // }
            });
            return resume;
        } catch (error) {
            console.error('Error fetching resume:', error);
            throw error;
        }
    }

    // Delete resume by ID
    static async deleteResume(id) {
        try {
            const deletedResume = await prisma.userResume.delete({
                where: { id: parseInt(id) }
            });
            return true;
        } catch (error) {
            console.error('Error deleting resume:', error);
            // If the record doesn't exist, Prisma will throw an error
            if (error.code === 'P2025') {
                return false;
            }
            throw error;
        }
    }
}

module.exports = ResumeController;
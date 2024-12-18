const express = require('express');
const router = express.Router();
const ResumeController = require('../controllers/resumeController'); // Assuming you'll create this controller

// Create a new resume
router.post('/user-resumes', async (req, res) => {
    try {
        const newResume = await ResumeController.createResume(req.body);
        res.status(201).json(newResume);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error creating resume', 
            error: error.message 
        });
    }
});

// Get resumes for a specific user email
router.get('/user-resumes', async (req, res) => {
    try {
        const userEmail = req.query.filters?.userEmail;
        if (!userEmail) {
            return res.status(400).json({ message: 'User email is required' });
        }
        
        const userResumes = await ResumeController.getUserResumes(userEmail);
        res.status(200).json(userResumes);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching user resumes', 
            error: error.message 
        });
    }
});

// Update resume details
router.put('/user-resumes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body.data;
        
        const updatedResume = await ResumeController.updateResume(id, updateData);
        res.status(200).json(updatedResume);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error updating resume', 
            error: error.message 
        });
    }
});

// Get resume by ID with population
router.get('/user-resumes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resume = await ResumeController.getResumeById(id);
        
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        
        res.status(200).json(resume);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching resume', 
            error: error.message 
        });
    }
});

// Delete resume by ID
router.delete('/user-resumes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletionResult = await ResumeController.deleteResume(id);
        
        if (deletionResult) {
            res.status(200).json({ message: 'Resume deleted successfully' });
        } else {
            res.status(404).json({ message: 'Resume not found' });
        }
    } catch (error) {
        res.status(500).json({ 
            message: 'Error deleting resume', 
            error: error.message 
        });
    }
});

module.exports = router;
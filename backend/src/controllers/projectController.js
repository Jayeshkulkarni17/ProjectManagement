const Project = require('../models/projectSchema');

// Create Project Controller
createProjectController = async (req, res) => {
    try {
        const { projectTheme, reason, type, division, category, priority, department, startDate, endDate, location } = req.body;

        if (!projectTheme || !reason || !type || !division || !category || !priority || !department || !startDate || !endDate || !location) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newProject = new Project({
            projectTheme,
            reason,
            type,
            division,
            category,
            priority,
            department,
            startDate,
            endDate,
            location
        });

        await newProject.save();

        res.status(201).json({ message: "Project created successfully.", project: newProject });
    } catch (error) {
        console.log("error in createProject", error);
        res.status(500).json({ message: "Internal server error" });
    }
};  

// Get Projects Controller
const getProjectController = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.status(200).json({ projects });
    } catch (error) {
        console.log("error in getProjectController", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update Project Status Controller
const updateProjectStatusController = async (req, res) => {
    try {
        const { status, id } = req.body;

        if (!status || !id) {
            return res.status(400).json({ message: "Status & id are required" });
        }

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        project.status = status;

        await project.save();

        res.status(200).json({ message: "Project status updated successfully", project });
    } catch (error) {
        console.log("error in updateProjectStatusController", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Project Count Controller
const projectCountController = async (req, res) => {
    try {
        let totalProjects = await Project.countDocuments({});
        let closedProjects = await Project.countDocuments({ status: "Closed" });
        let runningProjects = await Project.countDocuments({ status: "Running" });
        let cancelledProjects = await Project.countDocuments({ status: "Cancelled" });

        let delayedProjects = await Project.countDocuments({
            status: "Running",
            endDate: { $lt: new Date() }
        });

        res.status(200).json({
            TotalProject: totalProjects,
            Closed: closedProjects,
            Running: runningProjects,
            ClosureDelay: delayedProjects,
            Cancelled: cancelledProjects,
        });
    } catch (error) {
        console.error("error in projectCountController", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Chart Data Controller
const chartDataController = async (req, res) => {
    try {
        const departmentSuccess = await Project.aggregate([
            {
                $group: {
                    _id: '$department',
                    totalProjects: { $sum: 1 },
                    closedProjects: {
                        $sum: {
                            $cond: [{ $eq: ['$status', 'Closed'] }, 1, 0]
                        }
                    }
                }
            },
            {
                $project: {
                    department: '$_id',
                    totalProjects: 1,
                    closedProjects: 1,
                    successPercentage: {
                        $multiply: [{ $divide: ['$closedProjects', '$totalProjects'] }, 100]
                    }
                }
            }
        ]);

        res.status(200).json(departmentSuccess);
    } catch (error) {
        console.error('Error fetching department success data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createProjectController,
    getProjectController,
    updateProjectStatusController,
    projectCountController,
    chartDataController
};



const express = require('express');
const {
    createProjectController,
    getProjectController,
    updateProjectStatusController,
    projectCountController,
    chartDataController
} = require('../controllers/projectController');

const router = express.Router();

router.post('/create-project', createProjectController);
router.get('/project-list', getProjectController);
router.put('/update-status', updateProjectStatusController);
router.get('/dashboard', projectCountController);
router.get('/chart', chartDataController);

module.exports = router;

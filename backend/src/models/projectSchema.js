const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
    projectTheme: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        enum: ['Business', 'Dealership', 'Transport'],
        required: true,
    },
    type: {
        type: String,
        enum: ['Internal', 'External', 'Vendor'],
        required: true,
    },
    division: {
        type: String,
        enum: ['Compressor', 'Filters', 'Pumps', 'Glass', 'Water Heater'],
        required: true,
    },
    category: {
        type: String,
        enum: ['Quality A', 'Quality B', 'Quality C', 'Quality D'],
        required: true,
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: true,
    },
    department: {
        type: String,
        enum: ['Strategy', 'Finance', 'Quality', 'Maintenance', 'Stores'],
        required: true,
    },
    status: {
        type: String,
        enum: ['Registered', 'Running', 'Closed', 'Cancelled'],
        default: 'Registered'
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        enum: ['Pune', 'Delhi', 'Mumbai'],
        required: true,
    }
}, {
    timestamps: true
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author_id: { type: String, required: true },
    author_display_name: { type: String, required: true },
    body: { type: String, required: true },
    creation_date: { type: Date, default: Date.now }
}, { id: false });

const ticketSchema = new Schema({
    assignee: { type: String, required: false },
    creator_id: { type: String, required: true },
    creator_display_name: { type: String, required: true },
    type: { type: String, required: false },
    summary: { type: String, required: true },
    description: { type: String, required: false },
    environment: { type: String, required: true },
    priority: { type: String, required: true },
    resolution: { type: String, required: false },
    status: { type: String, required: false },
    creation_date: { type: Date, default: Date.now },
    update_date: { type: Date, default: Date.now },
    due_date: { type: Date, required: false },
    resolution_date: { type: Date, required: false },
    watches: { type: Number, required: false },
    time_estimate: { type: String, required: false },
    time_spent: { type: Number, required: false },
    fix_for: { type: Number, required: false },
    comments: [commentSchema]
}, { id: false });

ticketSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Ticket', ticketSchema);

// +----------------------+---------------+------+-----+---------+-------+
// | Field                | Type          | Null | Key | Default | Extra |
// +----------------------+---------------+------+-----+---------+-------+
// | ID                   | decimal(18,0) | NO   | PRI | NULL    |       |
// | pkey                 | varchar(255)  | YES  |     | NULL    |       |
// | issuenum             | decimal(18,0) | YES  | MUL | NULL    |       |
// | PROJECT              | decimal(18,0) | YES  | MUL | NULL    |       |
// | REPORTER             | varchar(255)  | YES  | MUL | NULL    |       |
// | ASSIGNEE             | varchar(255)  | YES  | MUL | NULL    |       |
// | CREATOR              | varchar(255)  | YES  |     | NULL    |       |
// | issuetype            | varchar(255)  | YES  |     | NULL    |       |
// | SUMMARY              | varchar(255)  | YES  |     | NULL    |       |
// | DESCRIPTION          | longtext      | YES  |     | NULL    |       |
// | ENVIRONMENT          | longtext      | YES  |     | NULL    |       |
// | PRIORITY             | varchar(255)  | YES  |     | NULL    |       |
// | RESOLUTION           | varchar(255)  | YES  |     | NULL    |       |
// | issuestatus          | varchar(255)  | YES  |     | NULL    |       |
// | CREATED              | datetime      | YES  | MUL | NULL    |       |
// | UPDATED              | datetime      | YES  | MUL | NULL    |       |
// | DUEDATE              | datetime      | YES  | MUL | NULL    |       |
// | RESOLUTIONDATE       | datetime      | YES  | MUL | NULL    |       |
// | WATCHES              | decimal(18,0) | YES  | MUL | NULL    |       |
// | TIMEORIGINALESTIMATE | decimal(18,0) | YES  |     | NULL    |       |
// | TIMEESTIMATE         | decimal(18,0) | YES  |     | NULL    |       |
// | TIMESPENT            | decimal(18,0) | YES  |     | NULL    |       |
// | WORKFLOW_ID          | decimal(18,0) | YES  | MUL | NULL    |       |
// | SECURITY             | decimal(18,0) | YES  |     | NULL    |       |
// | FIXFOR               | decimal(18,0) | YES  |     | NULL    |       |
// | COMPONENT            | decimal(18,0) | YES  |     | NULL    |       |
// +----------------------+---------------+------+-----+---------+-------+
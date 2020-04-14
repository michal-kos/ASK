const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    project_id: { type: String, required: true },
    reporter: { type: String, required: true },
    assignee: { type: String, required: true },
    creator: { type: String, required: true },
    issue_type: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    environment: { type: String, required: true },
    priority: { type: String, required: true },
    resolution: { type: String, required: true },
    issue_status: { type: String, required: true },
    creation_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    due_date: { type: Date, required: false },
    resolution_date: { type: Date, required: false },
    watches: { type: Number, required: false },
    time_orginal_estimate: { type: Number, required: false },
    time_estimate: { type: Number, required: false },
    time_spent: { type: Number, required: false },
    fix_for: { type: Number, required: false },
}, { id: false });

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Ticket', schema);

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
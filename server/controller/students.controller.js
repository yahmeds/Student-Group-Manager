const path = require('path');

module.exports.studentsPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/students.html'));
};
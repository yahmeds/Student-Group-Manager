const path = require('path');

module.exports.groupsPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/groups.html'));
};
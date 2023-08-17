const fs = require('fs');
const path = require('path');

const downloadFile = function (req, res, next) {
    const filePath = path.join(__dirname, '../../assets', 'glass.zip');
  
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      res.setHeader('Content-Disposition', `attachment; filename=${req.query.filename}`);
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      res.status(404).send('File not found');
    }
}


module.exports = {
    downloadFile
}
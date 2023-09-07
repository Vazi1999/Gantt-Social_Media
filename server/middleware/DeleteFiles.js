const fs = require('fs');
const path = require('path');
const PagesDetail = require('../models/pages_detail');
const CalendarEventsDB = require('../models/calendar_events');

async function DeleteOldFiles(newFiles){
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    const folderPath = './public/uploaded_files';

    fs.readdir(folderPath, (err, files) => {
        if (err) {
          console.error('Error reading folder:', err);
          return;
        }
      
        files.forEach(async (file) => {
          const filePath = path.join(folderPath, file);
          const fileMonth = Number(file.split('-')[1]);
          if((fileMonth +1 < currentMonth) && ((newFiles.find(f => f === file )) == undefined)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Error deleting ${file}:`, err);
                } else {
                    console.log(`${file} deleted.`);
                }
            });
            try {
                const fileNameParts = file.split('-'); // Split the file name by hyphens
                const year = fileNameParts[0];
                const month = fileNameParts[1];
                const day = fileNameParts[2];
                const dateFromFileName = new Date(`${year}-${month}-${day}`)
                dateFromFileName.setHours(0,0,0);

                await PagesDetail.findOneAndDelete({files: file})
                await CalendarEventsDB.findOneAndDelete({start:dateFromFileName})
            } catch (error) {
                console.error(`Error deleting ${file}:`, error);
            }
          }
        });
      });
}

module.exports = DeleteOldFiles

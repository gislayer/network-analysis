const fs = require('fs');

module.exports = {
    importSpatialFile(filePath){
        var extension = filePath.split('.').pop().toLowerCase();
        switch(extension){
            case 'geojson':{
                return JSON.parse(fs.readFileSync(filePath));
            }
        }
    }
}
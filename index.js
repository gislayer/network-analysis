const FileConverter = require('./src/FileConverter');

module.exports = {
    geojson:null,
    addLocalFile(filePath){
        this.geojson = FileConverter.importSpatialFile(filePath);
    }
};
const fs = require('fs');
const wkt = require('wkt');
const DOMParser = require("xmldom").DOMParser;
const tj = require('@tmcw/togeojson');
var shapefile = require("shapefile");

module.exports = {
    path:null,
    getFileData(){
        return fs.readFileSync(this.path,"utf8")
    },
    importSpatialFile(filePath){
        this.path = filePath;
        var extension = filePath.split('.').pop().toLowerCase();
        switch(extension){
            case 'geojson':{
                return JSON.parse(this.getFileData());
            }
            case 'kml':{
                var xmlData = this.getFileData();
                const kml = new DOMParser().parseFromString(xmlData);
                return tj.kml(kml);
            }
            case 'gpx':{
                var xmlData = this.getFileData();
                const gpx = new DOMParser().parseFromString(xmlData);
                return tj.gpx(gpx);
            }
            case 'wkt':{
                var wktData = this.getFileData();
                return {type:'FeatureCollection',features:wkt.parse(wktData).geometries};
            }
            case 'shp':{
                this.readShpFile();
                break;
            }
        }
    },
    read1(path){
        return new Promise(resolve => {
            var geojson = {type:'FeatureCollection',features:[]};
            shapefile.open(path)
                .then(source => source.read()
                    .then(function log(result) {
                    if(result.done==false){
                        geojson.features.push(result.value);
                        return source.read().then(log);
                    }else{
                        resolve(geojson)
                    }
                    }))
                .catch(error => console.error(error.stack));
          });
    },
    async readShpFile(){
        const result = await this.read1(this.path);
        return result;
    }

}
const FileConverter = require('./src/FileConverter');
const SpatialIndex = require('./src/SpatialIndex');

module.exports = {
    zoom:18,
    tolerance:1,
    sid:0,
    geojson:{type:'FeatureCollection',features:[]},
    segments:{},
    tileIndex:{},
    featureIndex:{},

    getGeoJSON(){
        return this.geojson;
    },

    settings(obj){
        this.zoom = obj['indexQuality']!==undefined?isNaN(obj['indexQuality'])==false?Number(obj['indexQuality']):18:18;
        this.tolerance = obj['tolerance']!==undefined?isNaN(obj['tolerance'])==false?Number(obj['tolerance']):18:18;
    },

    addLocalFile(filePath){
        var geoJSON = FileConverter.importSpatialFile(filePath);
        this.geojson = this.getLineStrings(geoJSON);
        var sIndex = SpatialIndex.findIndexed(this.segments);
        this.tileIndex = sIndex.tileIndex;
        this.featureIndex = sIndex.featureIndex;
    },

    parseSegments(fid,coords){
        for(var i=0;i<coords.length-1;i++){
            var i2=i+1;
            var c1 = coords[i];
            var c2 = coords[i2];
            i++;
            this.segments[this.sid]={sid:this.sid,fid:fid,coords:[c1,c2]};
            this.sid++;
        }
    },

    getLineStrings(data){
        var features = [];
        var fid=0;
        data.features.map(feature => {
            switch(feature.geometry.type){
                case 'LineString':{
                    feature.fid=fid;
                    
                    features.push(feature);
                    this.parseSegments(fid,feature.geometry.coordinates);
                    fid++;
                    break;
                }
                case 'MultiLineString':{
                    var parts = feature.geometry.coordinates;
                    parts.map(coord =>{
                        var geopart = { "type": "Feature", "fid":fid,"properties": feature.properties, "geometry": { "type": "LineString", "coordinates": [ coord ] } };
                        this.parseSegments(fid,feature.geometry.coordinates);
                        features.push(geopart);
                        fid++;
                    });
                    break;
                }
            }
        });
        return {type:'FeatureCollection',features:features};
    }
};